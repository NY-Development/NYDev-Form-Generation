import apiClient from "./apiClient";

export const listForms = async () => {
  const response = await apiClient.get("/forms");
  return response.data;
};

export const getForm = async (formId) => {
  const response = await apiClient.get(`/forms/${formId}`);
  return response.data;
};

export const createForm = async (payload) => {
  const response = await apiClient.post("/forms", payload);
  return response.data;
};

export const updateForm = async (formId, payload) => {
  const response = await apiClient.patch(`/forms/${formId}`, payload);
  return response.data;
};
