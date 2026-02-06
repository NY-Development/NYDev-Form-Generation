import apiClient from "./apiClient";

export const listOrganizations = async () => {
  const response = await apiClient.get("/superadmin/organizations");
  return response.data;
};

export const updateOrganizationPlan = async (orgId, plan) => {
  const response = await apiClient.patch(`/superadmin/organizations/${orgId}/plan`, { plan });
  return response.data;
};
