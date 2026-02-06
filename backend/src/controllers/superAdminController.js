import Organization from "../models/Organization.js";

export const listOrganizations = async (req, res, next) => {
  try {
    const organizations = await Organization.find().sort({ createdAt: -1 }).lean();
    res.json({ organizations });
  } catch (error) {
    next(error);
  }
};

export const updatePlan = async (req, res, next) => {
  try {
    const { orgId } = req.params;
    const { plan } = req.body;

    const organization = await Organization.findByIdAndUpdate(
      orgId,
      { plan },
      { new: true }
    );

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.json({ organization });
  } catch (error) {
    next(error);
  }
};
