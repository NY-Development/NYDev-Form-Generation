import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";
import { verifyRegistration } from "../controllers/registrationController.js";

const router = Router();

router.post("/:registrationId/verify", authRequired, requireRole(["form_admin", "org_admin"]), verifyRegistration);

export default router;
