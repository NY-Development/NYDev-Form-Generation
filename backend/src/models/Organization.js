import mongoose from "mongoose";

const BrandingSchema = new mongoose.Schema(
  {
    logoUrl: String,
    primaryColor: { type: String, default: "#1152d4" },
    backgroundColor: { type: String, default: "#f6f6f8" },
    watermarkEnabled: { type: Boolean, default: true }
  },
  { _id: false }
);

const OrganizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    plan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
    branding: { type: BrandingSchema, default: () => ({}) }
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", OrganizationSchema);

export default Organization;
