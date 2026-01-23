import api from "./api.js"

export const sendChatMessage = async(documentId,message)=>{
    const response = await api.post(`/chat/${documentId}`,{
        message
    });

    return response.data;
}

export const getChatHistory = async(documentId)=>{
    const response = await api.get(`/chat/${documentId}`);
    return response.data;
}