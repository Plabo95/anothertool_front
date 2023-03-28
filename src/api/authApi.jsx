import axios from "axios";

const authApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'user'
})

export const login = async(credentials) => {
    const response =  await authApi.post('/token', credentials);
    return response.data
}

export const register = async(credentials) => {
    const response =  await authApi.post('/create', credentials);
    return response.data
}
