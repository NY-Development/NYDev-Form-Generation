import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";
import { listOrganizations, updatePlan } from "../controllers/superAdminController.js";

const router = Router();

router.get("/organizations", authRequired, requireRole(["superadmin"]), listOrganizations);
router.patch("/organizations/:orgId/plan", authRequired, requireRole(["superadmin"]), updatePlan);

export default router;
