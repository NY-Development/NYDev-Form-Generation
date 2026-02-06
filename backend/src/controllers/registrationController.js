import Form from "../models/Form.js";
import Organization from "../models/Organization.js";
import Registration from "../models/Registration.js";
import { generateRegistrationId } from "../utils/idGenerator.js";
import { generateVerificationToken } from "../utils/qrToken.js";

export const createRegistration = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const form = await Form.findById(formId);

    if (!form || form.status === "draft") {
      return res.status(404).json({ message: "Form not found" });
    }

    const organization = await Organization.findById(form.organization);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      { $inc: { registrationCount: 1 } },
      { new: true }
    );

    const sequence = updatedForm?.registrationCount || 1;
    const registrationId = generateRegistrationId({
      orgCode: organization.slug || "ORG",
      formCode: form.title || "FORM",
      sequence
    });

    const verificationToken = generateVerificationToken();

    const registration = await Registration.create({
      form: form._id,
      organization: organization._id,
      attendee: req.body.attendee,
      answers: req.body.answers || [],
      registrationId,
      verificationToken,
      status: "pending"
    });

    res.status(201).json({
      registration,
      qrPayload: {
        registrationId,
        formId: form._id,
        token: verificationToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const listRegistrations = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const registrations = await Registration.find({ form: formId }).sort({ createdAt: -1 }).lean();
    res.json({ registrations });
  } catch (error) {
    next(error);
  }
};

export const verifyRegistration = async (req, res, next) => {
  try {
    const { registrationId } = req.params;
    const { token } = req.body;

    const registration = await Registration.findOne({ registrationId });
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    if (registration.verificationToken !== token) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    registration.status = "verified";
    await registration.save();

    res.json({ registration });
  } catch (error) {
    next(error);
  }
};
