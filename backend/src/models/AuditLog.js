const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    userName: {
      type: String,
      default: 'System',
    },
    action: {
      type: String,
      required: true,
      enum: [
        'login_success',
        'login_failed',
        'logout',
        'plan_upgrade',
        'plan_downgrade',
        'form_created',
        'form_deleted',
        'form_updated',
        'user_created',
        'user_deleted',
        'user_updated',
        'org_created',
        'org_suspended',
        'org_activated',
        'api_key_created',
        'api_key_revoked',
        'settings_updated',
        'submission_received',
        'admin_invited',
        'password_changed',
        'other',
      ],
    },
    entity: {
      type: String,
      default: '',
    },
    entityId: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '0.0.0.0',
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'critical'],
      default: 'info',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for fast querying
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ userId: 1 });
auditLogSchema.index({ severity: 1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
