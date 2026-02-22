import jwt from "jsonwebtoken";

export const getMe = (req, res) => {
  res.json({ user: req.user });
};

export const googleCallback = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      organization: user.organization
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  // Redirect to frontend with token
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  res.redirect(`${frontendUrl}/google-auth-success?token=${token}`);
};
