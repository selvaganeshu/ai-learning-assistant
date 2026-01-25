import api from "./api.js";

export const getRecentActivities = async ()=>{
    const response = await api.get('/activity');
    return response.data;
}