const Submission = require('../models/Submission');
const Form = require('../models/Form');
const User = require('../models/User');
const Organization = require('../models/Organization');

/**
 * Get organization-level analytics
 */
const getOrganizationAnalytics = async (orgId) => {
  const [
    totalForms,
    publishedForms,
    totalSubmissions,
    statusBreakdown,
    recentSubmissions,
    submissionsOverTime,
  ] = await Promise.all([
    // Total forms
    Form.countDocuments({ organizationId: orgId }),

    // Published forms
    Form.countDocuments({ organizationId: orgId, status: 'published' }),

    // Total submissions
    Submission.countDocuments({ organizationId: orgId }),

    // Status breakdown
    Submission.aggregate([
      { $match: { organizationId: require('mongoose').Types.ObjectId.createFromHexString(orgId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),

    // Recent 5 submissions
    Submission.find({ organizationId: orgId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('formId', 'title')
      .select('submitterName submitterEmail uniqueId status createdAt'),

    // Submissions over last 30 days
    Submission.aggregate([
      {
        $match: {
          organizationId: require('mongoose').Types.ObjectId.createFromHexString(orgId),
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  // Format status breakdown
  const statusMap = {};
  statusBreakdown.forEach((item) => {
    statusMap[item._id] = item.count;
  });

  return {
    overview: {
      totalForms,
      publishedForms,
      draftForms: totalForms - publishedForms,
      totalSubmissions,
    },
    statusBreakdown: {
      pending: statusMap.pending || 0,
      approved: statusMap.approved || 0,
      rejected: statusMap.rejected || 0,
      verified: statusMap.verified || 0,
    },
    recentSubmissions,
    submissionsOverTime,
  };
};

/**
 * Get form-level analytics
 */
const getFormAnalytics = async (formId) => {
  const [
    form,
    statusBreakdown,
    submissionsOverTime,
  ] = await Promise.all([
    Form.findById(formId).select('title submissionCount status createdAt'),

    Submission.aggregate([
      { $match: { formId: require('mongoose').Types.ObjectId.createFromHexString(formId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),

    Submission.aggregate([
      {
        $match: {
          formId: require('mongoose').Types.ObjectId.createFromHexString(formId),
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const statusMap = {};
  statusBreakdown.forEach((item) => {
    statusMap[item._id] = item.count;
  });

  return {
    form: {
      title: form?.title,
      totalSubmissions: form?.submissionCount || 0,
      status: form?.status,
      createdAt: form?.createdAt,
    },
    statusBreakdown: {
      pending: statusMap.pending || 0,
      approved: statusMap.approved || 0,
      rejected: statusMap.rejected || 0,
      verified: statusMap.verified || 0,
    },
    submissionsOverTime,
  };
};

/**
 * Get platform-wide analytics (for superadmin)
 */
const getPlatformAnalytics = async () => {
  const [totalOrgs, totalUsers, totalForms, totalSubmissions, planBreakdown] = await Promise.all([
    Organization.countDocuments(),
    User.countDocuments(),
    Form.countDocuments(),
    Submission.countDocuments(),
    require('../models/Subscription').aggregate([
      { $group: { _id: '$plan', count: { $sum: 1 } } },
    ]),
  ]);

  const planMap = {};
  planBreakdown.forEach((item) => {
    planMap[item._id] = item.count;
  });

  return {
    totalOrganizations: totalOrgs,
    totalUsers,
    totalForms,
    totalSubmissions,
    planBreakdown: {
      free: planMap.free || 0,
      pro: planMap.pro || 0,
      enterprise: planMap.enterprise || 0,
    },
  };
};

module.exports = {
  getOrganizationAnalytics,
  getFormAnalytics,
  getPlatformAnalytics,
};
