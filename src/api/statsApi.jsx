import axios from "axios";

const statsApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const getOrderStats = async(payload) => {
    const response =  await statsApi.get('order-stats/', 
    {headers: {'Authorization': payload.auth}}
    );
    return response.data
}
