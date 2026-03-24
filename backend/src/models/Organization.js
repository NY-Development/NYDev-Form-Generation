const mongoose = require('mongoose');
const slugify = require('slugify');

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
      maxlength: [100, 'Organization name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Organization must have an owner'],
    },
    logo: {
      type: String,
      default: '',
    },
    branding: {
      primaryColor: { type: String, default: '#6C63FF' },
      secondaryColor: { type: String, default: '#3F3D56' },
      accentColor: { type: String, default: '#FF6584' },
      logo: { type: String, default: '' },
      favicon: { type: String, default: '' },
      fontFamily: { type: String, default: 'Inter' },
    },
    settings: {
      defaultFormApproval: { type: Boolean, default: false },
      notificationsEnabled: { type: Boolean, default: true },
      publicProfile: { type: Boolean, default: false },
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Generate slug before saving
organizationSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Virtual: forms count
organizationSchema.virtual('forms', {
  ref: 'Form',
  localField: '_id',
  foreignField: 'organizationId',
  count: true,
});

// Virtual: users/members
organizationSchema.virtual('members', {
  ref: 'User',
  localField: '_id',
  foreignField: 'organizationId',
});

// Indexes
organizationSchema.index({ owner: 1 });
organizationSchema.index({ isActive: 1 });

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
