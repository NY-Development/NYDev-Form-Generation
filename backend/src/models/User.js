import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    role: { type: String, enum: ["org_admin", "form_admin", "superadmin"], default: "org_admin" },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
