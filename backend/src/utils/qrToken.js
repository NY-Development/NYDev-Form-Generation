import crypto from "crypto";

export const generateVerificationToken = () => {
  return crypto.randomBytes(24).toString("hex");
};
