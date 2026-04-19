const mongoose = require('mongoose');
const slugify = require('slugify');

const formFieldSchema = new mongoose.Schema(
  {
    fieldId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: [true, 'Field label is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Field type is required'],
      enum: {
        values: [
          'text',
          'email',
          'phone',
          'number',
          'textarea',
          'select',
          'radio',
          'checkbox',
          'date',
          'time',
          'file',
          'url',
          'address',
          'video',
          'page_break',
        ],
        message: 'Invalid field type',
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    options: [
      {
        label: String,
        value: String,
      },
    ],
    validation: {
      minLength: Number,
      maxLength: Number,
      min: Number,
      max: Number,
      pattern: String,
      customError: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Form title is required'],
      trim: true,
      maxlength: [200, 'Form title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Form slug is required'],
      unique: true,
      lowercase: true,
      index: true,
    },
    link: {
      type: String,
      required: [true, 'Form link is required'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Form must belong to an organization'],
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Form must have a creator'],
    },
    fields: [formFieldSchema],
    settings: {
      isPublic: { type: Boolean, default: true },
      acceptingResponses: { type: Boolean, default: true },
      maxResponses: { type: Number, default: 0 }, // 0 = unlimited
      confirmationMessage: {
        type: String,
        default: 'Thank you for your registration! Your unique ID and QR code have been generated.',
      },
      requireApproval: { type: Boolean, default: false },
      notifyOnSubmission: { type: Boolean, default: true },
      allowEditing: { type: Boolean, default: false },
      oneResponsePerEmail: { type: Boolean, default: true },
    },
    branding: {
      headerImage: { type: String, default: '' },
      primaryColor: { type: String, default: '' }, // Empty = use org branding
      backgroundColor: { type: String, default: '' },
      fontFamily: { type: String, default: '' },
      showOrgLogo: { type: Boolean, default: true },
      customCSS: { type: String, default: '' },
      socialLinks: {
        youtube: { type: String, default: '' },
        tiktok: { type: String, default: '' },
        instagram: { type: String, default: '' },
      },
    },
    template: {
      isTemplate: { type: Boolean, default: false },
      category: {
        type: String,
        enum: ['', 'church', 'event', 'education', 'conference', 'ngo', 'general'],
        default: '',
      },
      templateName: { type: String, default: '' },
      templateDescription: { type: String, default: '' },
    },
    uniqueIdConfig: {
      prefix: { type: String, default: 'REG' },
      useSequential: { type: Boolean, default: false },
    },
    status: {
      type: String,
      enum: {
        values: ['draft', 'published', 'closed'],
        message: 'Status must be draft, published, or closed',
      },
      default: 'draft',
    },
    submissionCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save hook for slug removed. Slugs and links are now generated in the formService to guarantee atomic creation parameters.

// Virtual: submissions
formSchema.virtual('submissions', {
  ref: 'Submission',
  localField: '_id',
  foreignField: 'formId',
});

// Indexes
formSchema.index({ organizationId: 1, status: 1 });
formSchema.index({ slug: 1 });
formSchema.index({ 'template.isTemplate': 1, 'template.category': 1 });
formSchema.index({ createdBy: 1 });

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
