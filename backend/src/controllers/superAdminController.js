const Organization = require('../models/Organization');
const User = require('../models/User');
const Form = require('../models/Form');
const Submission = require('../models/Submission');
const Subscription = require('../models/Subscription');
const AuditLog = require('../models/AuditLog');
const SupportTicket = require('../models/SupportTicket');
const analyticsService = require('../services/analyticsService');
const { sendSuccess, sendPaginated } = require('../utils/response');

/**
 * @desc    Get all organizations (with pagination)
 * @route   GET /api/superadmin/organizations
 * @access  Private (SuperAdmin)
 */
const getOrganizations = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, status } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;

    const skip = (page - 1) * limit;

    const [organizations, total] = await Promise.all([
      Organization.find(query)
        .populate('owner', 'firstName lastName email')
        .populate('subscription', 'plan status')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Organization.countDocuments(query),
    ]);

    sendPaginated(res, organizations, {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/superadmin/users
 * @access  Private (SuperAdmin)
 */
const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (role) query.role = role;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .populate('organizationId', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query),
    ]);

    sendPaginated(res, users, {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get platform-wide stats
 * @route   GET /api/superadmin/stats
 * @access  Private (SuperAdmin)
 */
const getStats = async (req, res, next) => {
  try {
    const stats = await analyticsService.getPlatformAnalytics();
    sendSuccess(res, { stats });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle organization active status
 * @route   PUT /api/superadmin/organizations/:orgId/status
 * @access  Private (SuperAdmin)
 */
const toggleOrganizationStatus = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.params.orgId);
    if (!org) {
      return res.status(404).json({ success: false, message: 'Organization not found' });
    }

    org.isActive = !org.isActive;
    await org.save();

    sendSuccess(res, { organization: org }, 200, `Organization ${org.isActive ? 'activated' : 'deactivated'}`);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update organization subscription (admin override)
 * @route   PUT /api/superadmin/organizations/:orgId/subscription
 * @access  Private (SuperAdmin)
 */
const updateOrgSubscription = async (req, res, next) => {
  try {
    const { plan } = req.body;
    const subscription = await Subscription.findOne({ organizationId: req.params.orgId });

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    const newLimits = Subscription.getPlanLimits(plan);
    subscription.plan = plan;
    subscription.limits = newLimits;
    subscription.status = 'active';
    await subscription.save();

    sendSuccess(res, { subscription }, 200, `Subscription updated to ${plan}`);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get audit logs
 * @route   GET /api/superadmin/audit-logs
 * @access  Private (SuperAdmin)
 */
const getAuditLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, action, severity, search } = req.query;
    const query = {};

    if (action && action !== 'all') query.action = action;
    if (severity) query.severity = severity;
    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: 'i' } },
        { entity: { $regex: search, $options: 'i' } },
        { ipAddress: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      AuditLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      AuditLog.countDocuments(query),
    ]);

    const criticalCount = await AuditLog.countDocuments({ severity: 'critical', createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
    const activeAdmins = await User.countDocuments({ role: { $in: ['superadmin', 'admin'] }, isActive: true });

    sendPaginated(res, logs, {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
      criticalCount,
      activeAdmins,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get support tickets
 * @route   GET /api/superadmin/support-tickets
 * @access  Private (SuperAdmin)
 */
const getSupportTickets = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, priority, search } = req.query;
    const query = {};

    if (status && status !== 'all') query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { organizationName: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [tickets, total, openCount, pendingCount, resolvedCount] = await Promise.all([
      SupportTicket.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      SupportTicket.countDocuments(query),
      SupportTicket.countDocuments({ status: 'open' }),
      SupportTicket.countDocuments({ status: 'pending' }),
      SupportTicket.countDocuments({ status: { $in: ['resolved', 'closed'] } }),
    ]);

    sendPaginated(res, tickets, {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
      openCount,
      pendingCount,
      resolvedCount,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create support ticket
 * @route   POST /api/superadmin/support-tickets
 */
const createSupportTicket = async (req, res, next) => {
  try {
    const { title, description, priority, organizationName } = req.body;
    const ticket = await SupportTicket.create({
      title,
      description,
      priority: priority || 'medium',
      organizationName: organizationName || '',
      createdBy: req.user.id,
    });
    sendSuccess(res, { ticket }, 201, 'Ticket created');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update support ticket
 * @route   PUT /api/superadmin/support-tickets/:id
 */
const updateSupportTicket = async (req, res, next) => {
  try {
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });
    sendSuccess(res, { ticket }, 200, 'Ticket updated');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrganizations,
  getUsers,
  getStats,
  toggleOrganizationStatus,
  updateOrgSubscription,
  getAuditLogs,
  getSupportTickets,
  createSupportTicket,
  updateSupportTicket,
};
