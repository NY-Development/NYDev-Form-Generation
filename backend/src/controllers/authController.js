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

  res.json({ user, token });
};
