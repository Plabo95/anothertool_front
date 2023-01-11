import axios from "axios";

const authApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const login = async(credentials) => {
    const response =  await authApi.post('/login', credentials);
    return response.data
}
export const register = async(credentials) => {
    const response =  await authApi.post('/register', credentials);
    return response.data
}
