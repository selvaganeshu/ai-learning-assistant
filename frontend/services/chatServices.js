import api from "./api.js"

export const sendChatMessage = async(documentId,message)=>{
    const response = await api.post(`/chat/${documentId}`,{
        message
    });

    return response.data;
}