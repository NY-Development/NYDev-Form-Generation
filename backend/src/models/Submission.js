const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: [true, 'Submission must belong to a form'],
      index: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Submission must belong to an organization'],
      index: true,
    },
    responses: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: [true, 'Submission must have responses'],
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    qrCode: {
      type: String, // Base64 data URL
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'approved', 'rejected', 'verified'],
        message: 'Status must be pending, approved, rejected, or verified',
      },
      default: 'pending',
    },
    submitterEmail: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    submitterName: {
      type: String,
      trim: true,
      default: '',
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    metadata: {
      ipAddress: { type: String, default: '' },
      userAgent: { type: String, default: '' },
      referrer: { type: String, default: '' },
    },
    notes: {
      type: String,
      default: '',
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for common queries
submissionSchema.index({ formId: 1, status: 1 });
submissionSchema.index({ organizationId: 1, createdAt: -1 });
submissionSchema.index({ uniqueId: 1 });
submissionSchema.index({ submitterEmail: 1, formId: 1 });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
