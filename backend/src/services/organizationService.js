const Organization = require('../models/Organization');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const AppError = require('../utils/AppError');

/**
 * Get organization by ID with populated refs
 */
const getById = async (orgId) => {
  const organization = await Organization.findById(orgId)
    .populate('owner', 'firstName lastName email')
    .populate('subscription');

  if (!organization) {
    throw new AppError('Organization not found.', 404);
  }

  return organization;
};

/**
 * Update organization details
 */
const update = async (orgId, updates) => {
  const allowedUpdates = ['name', 'description', 'logo', 'settings'];
  const filteredUpdates = {};

  Object.keys(updates).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      filteredUpdates[key] = updates[key];
    }
  });

  const organization = await Organization.findByIdAndUpdate(orgId, filteredUpdates, {
    new: true,
    runValidators: true,
  });

  if (!organization) {
    throw new AppError('Organization not found.', 404);
  }

  return organization;
};

/**
 * Update organization branding
 */
const updateBranding = async (orgId, brandingData) => {
  // Check if org has custom branding access
  const org = await Organization.findById(orgId).populate('subscription');
  if (!org) {
    throw new AppError('Organization not found.', 404);
  }

  if (org.subscription && !org.subscription.limits.customBranding) {
    throw new AppError('Custom branding is not available on your current plan. Please upgrade to Pro.', 403);
  }

  const updatedOrg = await Organization.findByIdAndUpdate(
    orgId,
    { branding: { ...org.branding.toObject(), ...brandingData } },
    { new: true, runValidators: true }
  );

  return updatedOrg;
};

/**
 * Get organization members
 */
const getMembers = async (orgId) => {
  const members = await User.find({ organizationId: orgId })
    .select('-password')
    .sort({ createdAt: -1 });

  return members;
};

/**
 * Add an admin to the organization
 */
const addAdmin = async (orgId, { firstName, lastName, email, password }) => {
  // Check admin limits
  const org = await Organization.findById(orgId).populate('subscription');
  if (!org) {
    throw new AppError('Organization not found.', 404);
  }

  const currentAdminCount = await User.countDocuments({ organizationId: orgId });
  const maxAdmins = org.subscription ? org.subscription.limits.maxAdmins : 1;

  if (maxAdmins !== -1 && currentAdminCount >= maxAdmins) {
    throw new AppError(`You have reached the maximum number of admins (${maxAdmins}) for your plan.`, 403);
  }

  // Check if email already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('A user with this email already exists.', 400);
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: 'admin',
    organizationId: orgId,
  });

  return {
    id: admin._id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    role: admin.role,
  };
};

/**
 * Remove an admin from the organization
 */
const removeAdmin = async (orgId, adminId) => {
  const admin = await User.findOne({ _id: adminId, organizationId: orgId });

  if (!admin) {
    throw new AppError('Admin not found in this organization.', 404);
  }

  if (admin.role === 'owner') {
    throw new AppError('Cannot remove the organization owner.', 400);
  }

  admin.isActive = false;
  await admin.save();

  return { message: 'Admin removed successfully.' };
};

module.exports = {
  getById,
  update,
  updateBranding,
  getMembers,
  addAdmin,
  removeAdmin,
};
