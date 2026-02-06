import apiClient from "./apiClient";

export const createRegistration = async (formId, payload) => {
  const response = await apiClient.post(`/forms/${formId}/registrations`, payload);
  return response.data;
};

export const listRegistrations = async (formId) => {
  const response = await apiClient.get(`/forms/${formId}/registrations`);
  return response.data;
};

export const verifyRegistration = async (registrationId, token) => {
  const response = await apiClient.post(`/registrations/${registrationId}/verify`, { token });
  return response.data;
};
