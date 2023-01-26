import axios from "axios";

const eventApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'events'
})

export const getAllEvents = async(credentials) => {
    const response =  await eventApi.get('', credentials);
    return response.data
}

//With identifier
