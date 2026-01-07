import api from "./api";

export const getDocuments = async () => {
  const response = await api.get("/documents");
  return response.data;
};
