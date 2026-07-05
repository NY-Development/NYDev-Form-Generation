const mongoose = require('mongoose');

const updateEmailSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: [true, 'Update email must be associated with a form'],
      index: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Update email must belong to an organization'],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'An update must track the sending individual'],
    },
    subject: {
      type: String,
      required: [true, 'Subject line is mandatory'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message content cannot be blank'],
    },
    recipientsCount: {
      type: Number,
      default: 0,
    },
    recipientsList: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

updateEmailSchema.index({ formId: 1, createdAt: -1 });

module.exports = mongoose.model('UpdateEmail', updateEmailSchema);