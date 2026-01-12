import api from "./api.js";

export const getFlashcards = async(documentId)=>{
    const response = await api.get(`/flashcards/${documentId}`);
    return response.data;
}
