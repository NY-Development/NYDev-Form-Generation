const User = require('../models/User');
const Organization = require('../models/Organization');
const Subscription = require('../models/Subscription');
const AppError = require('../utils/AppError');
const { OAuth2Client } = require('google-auth-library');
const env = require('../config/env');

// Emails that automatically get superadmin privileges
const SUPERADMIN_EMAILS = ['yamlaknegash96@gmail.com'];

const client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

/**
 * Register a new user and create their organization
 */
const register = async ({ firstName, lastName, email, password, organizationName }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('A user with this email already exists.', 400);
  }

  // Create the user first (without org)
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: 'owner',
  });

  // Create organization with the user as owner
  const organization = await Organization.create({
    name: organizationName || `${firstName}'s Organization`,
    owner: user._id,
  });

  // Create free subscription for the org
  const subscription = await Subscription.create({
    organizationId: organization._id,
    plan: 'free',
    limits: Subscription.getPlanLimits('free'),
  });

  // Link org and subscription
  organization.subscription = subscription._id;
  await organization.save();

  // Update user with org reference
  user.organizationId = organization._id;
  await user.save();

  // Generate token
  const token = user.generateJWT();

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    },
    organization: {
      id: organization._id,
      name: organization.name,
      slug: organization.slug,
    },
    token,
  };
};

/**
 * Login user with email and password
 */
const login = async ({ email, password }) => {
  // Find user with password field
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  if (!user.isActive) {
    throw new AppError('Your account has been deactivated. Please contact support.', 401);
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new AppError('Invalid email or password.', 401);
  }

  // Update last login
  user.lastLogin = new Date();
  // Auto-promote to superadmin if email matches
  if (SUPERADMIN_EMAILS.includes(user.email) && user.role !== 'superadmin') {
    user.role = 'superadmin';
  }
  await user.save({ validateBeforeSave: false });

  // Generate token
  const token = user.generateJWT();

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    },
    token,
  };
};

/**
 * Handle Google Login (OAuth Code Exchange)
 */
const googleLogin = async ({ code }) => {
  const { tokens } = await client.getToken(code);
  
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: env.GOOGLE_CLIENT_ID,
  });
  
  const payload = ticket.getPayload();
  const { email, given_name, family_name, picture, sub } = payload;

  let user = await User.findOne({ email });
  let organization;

  if (user) {
    if (!user.googleId) {
      user.googleId = sub;
    }
    user.lastLogin = new Date();
    if (picture && !user.avatar) {
      user.avatar = picture;
    }
    // Auto-promote to superadmin if email matches
    if (SUPERADMIN_EMAILS.includes(user.email) && user.role !== 'superadmin') {
      user.role = 'superadmin';
    }
    await user.save({ validateBeforeSave: false });
    organization = await Organization.findOne({ owner: user._id });
  } else {
    // Determine free plan
    const limits = Subscription.getPlanLimits ? Subscription.getPlanLimits('free') : undefined;

    user = await User.create({
      firstName: given_name,
      lastName: family_name || 'User',
      email,
      googleId: sub,
      avatar: picture,
      role: 'owner',
    });

    organization = await Organization.create({
      name: `${given_name}'s Organization`,
      owner: user._id,
    });

    const subscription = await Subscription.create({
      organizationId: organization._id,
      plan: 'free',
      limits: limits,
    });

    organization.subscription = subscription._id;
    await organization.save();

    user.organizationId = organization._id;
    await user.save();
  }

  const token = user.generateJWT();

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      organizationId: user.organizationId,
    },
    organization: organization ? {
      id: organization._id,
      name: organization.name,
      slug: organization.slug,
    } : null,
    token,
  };
};

/**
 * Get user profile with organization details
 */
const getProfile = async (userId) => {
  const user = await User.findById(userId)
    .select('-password')
    .populate({
      path: 'organizationId',
      select: 'name slug logo branding',
      populate: {
        path: 'subscription',
        select: 'plan limits status',
      },
    });

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

/**
 * Update user password
 */
const updatePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    throw new AppError('Current password is incorrect.', 400);
  }

  user.password = newPassword;
  await user.save();

  const token = user.generateJWT();

  return { token };
};

/**
 * Update user profile
 */
const updateProfile = async (userId, updates) => {
  const allowedUpdates = ['firstName', 'lastName', 'avatar'];
  const filteredUpdates = {};

  Object.keys(updates).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      filteredUpdates[key] = updates[key];
    }
  });

  const user = await User.findByIdAndUpdate(userId, filteredUpdates, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

module.exports = {
  register,
  login,
  googleLogin,
  getProfile,
  updatePassword,
  updateProfile,
};
