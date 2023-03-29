import axios from "axios";

const workshopApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'workshop'
})

export const getWorkshop = async(payload) => {
    const response =  await workshopApi.get('/',
    {headers: {'Authorization': payload.auth}}
    );
    return response.data
}