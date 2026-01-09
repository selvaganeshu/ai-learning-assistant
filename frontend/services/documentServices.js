import api from "./api";

export const getDocuments = async () => {
  const response = await api.get("/documents");
  return response.data;
};

export const deleteDocument = async (documentId) => {
  const response = await api.delete(`/documents/${documentId}`);
  return response.data;
}

export const downloadDocument = async(documentId)=>{
  const response = await api.get(`/documents/${documentId}/download`,{
    responseType : "blob"
  });
  return response.data;
}