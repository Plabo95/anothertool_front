import axios from "axios";

const authApi = axios.create({
    baseURL: 'http://dev.loteriasconfortuna.aratech.org:3000/api/auth'
})

export const login = async(credentials) => {
    const response =  await authApi.post('/login', credentials);
    return response.data
}