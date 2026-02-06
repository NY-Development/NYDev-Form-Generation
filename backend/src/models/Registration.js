import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    form: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
    attendee: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String
    },
    answers: [{
      fieldId: String,
      value: mongoose.Schema.Types.Mixed
    }],
    registrationId: { type: String, required: true, unique: true },
    verificationToken: { type: String, required: true },
    status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", RegistrationSchema);

export default Registration;
