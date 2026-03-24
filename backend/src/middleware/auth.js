const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const env = require('../config/env');

/**
 * Protect routes - verify JWT token and attach user to request
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new AppError('Not authorized to access this route. Please log in.', 401));
    }

    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated. Please contact support.', 401));
    }

    // Attach user and org to request
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Not authorized to access this route.', 401));
  }
};

/**
 * Authorize specific roles
 * @param  {...string} roles - Allowed roles (e.g., 'owner', 'admin', 'superadmin')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('User not authenticated.', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }

    next();
  };
};

/**
 * Verify user belongs to the organization in the request
 * Checks req.params.orgId against req.user.organizationId
 * SuperAdmins bypass this check
 */
const orgAccess = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('User not authenticated.', 401));
  }

  // SuperAdmins can access any org
  if (req.user.role === 'superadmin') {
    return next();
  }

  const orgId = req.params.orgId || req.body.organizationId;

  if (!orgId) {
    return next(new AppError('Organization ID is required.', 400));
  }

  if (req.user.organizationId && req.user.organizationId.toString() !== orgId) {
    return next(new AppError('You do not have access to this organization.', 403));
  }

  next();
};

module.exports = { protect, authorize, orgAccess };
