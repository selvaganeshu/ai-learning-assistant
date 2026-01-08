import api from "./api";

export const getDocuments = async () => {
  const response = await api.get("/documents");
  return response.data;
};

export const deleteDocument = async (documentId) => {
  const response = await api.delete(`/documents/${documentId}`,{
    responseType : 'blob'
  });
  return response.data;
}