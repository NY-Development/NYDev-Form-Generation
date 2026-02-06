import { Router } from "express";
import passport from "passport";
import { authRequired } from "../middleware/auth.js";
import { getMe, googleCallback } from "../controllers/authController.js";

const router = Router();

router.get("/me", authRequired, getMe);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleCallback
);

export default router;
