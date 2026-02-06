import Form from "../models/Form.js";
import Organization from "../models/Organization.js";

const enforcePlanRules = (organization, settings) => {
  if (organization.plan === "free" && settings && settings.watermarkEnabled === false) {
    const error = new Error("Free plan requires watermark enabled");
    error.status = 403;
    throw error;
  }
};

export const createForm = async (req, res, next) => {
  try {
    const { title, description, fields = [], settings = {} } = req.body;
    const organization = await Organization.findById(req.user.organization);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    enforcePlanRules(organization, settings);

    const form = await Form.create({
      organization: organization._id,
      title,
      description,
      fields,
      settings: {
        watermarkEnabled: organization.plan === "free" ? true : settings.watermarkEnabled,
        public: settings.public ?? true,
        requireQrVerification: settings.requireQrVerification ?? true
      }
    });

    res.status(201).json({ form });
  } catch (error) {
    next(error);
  }
};

export const getFormById = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.formId).lean();
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json({ form });
  } catch (error) {
    next(error);
  }
};

export const updateForm = async (req, res, next) => {
  try {
    const organization = await Organization.findById(req.user.organization);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const updates = req.body;
    enforcePlanRules(organization, updates.settings || {});

    const form = await Form.findOneAndUpdate(
      { _id: req.params.formId, organization: organization._id },
      updates,
      { new: true }
    );

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json({ form });
  } catch (error) {
    next(error);
  }
};

export const listForms = async (req, res, next) => {
  try {
    const forms = await Form.find({ organization: req.user.organization }).sort({ createdAt: -1 }).lean();
    res.json({ forms });
  } catch (error) {
    next(error);
  }
};
