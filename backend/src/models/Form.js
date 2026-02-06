import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: [{ type: String }]
  },
  { _id: false }
);

const FormSettingsSchema = new mongoose.Schema(
  {
    public: { type: Boolean, default: true },
    requireQrVerification: { type: Boolean, default: true },
    watermarkEnabled: { type: Boolean, default: true }
  },
  { _id: false }
);

const FormSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
    title: { type: String, required: true },
    description: { type: String },
    fields: [FieldSchema],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    settings: { type: FormSettingsSchema, default: () => ({}) },
    registrationCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", FormSchema);

export default Form;
