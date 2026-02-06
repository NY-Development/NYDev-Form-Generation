import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";
import { createForm, getFormById, listForms, updateForm } from "../controllers/formController.js";
import { createRegistration, listRegistrations } from "../controllers/registrationController.js";

const router = Router();

router.get("/", authRequired, requireRole(["org_admin"]), listForms);
router.post("/", authRequired, requireRole(["org_admin"]), createForm);
router.get("/:formId", getFormById);
router.patch("/:formId", authRequired, requireRole(["org_admin"]), updateForm);
router.post("/:formId/registrations", createRegistration);
router.get("/:formId/registrations", authRequired, requireRole(["form_admin", "org_admin"]), listRegistrations);

export default router;
