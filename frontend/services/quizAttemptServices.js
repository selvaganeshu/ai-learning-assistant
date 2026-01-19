import api from "./api";

export const saveQuizAttempt = async(documentId,score)=>{
    const response = await api.post(`/quiz-attempts/${documentId}`,{
        score
    });
    return response.data;
}

export const getQuizAttempt = async(documentId)=>{
    const response = await api.get(`/quiz-attempts/${documentId}`);
    return response.data;
}

export const getBestScore = async()=>{
    const response = await api.get("/quiz-attempts/best");
    return response.data;
}
