import api from "./api.js";

export const getQuizByDocument = async(documentId)=>{
    const response = await api.get(`/quizzes/${documentId}`);
    return response.data;
}