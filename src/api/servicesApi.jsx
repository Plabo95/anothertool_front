import axios from "axios";

const servicesApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'services'
})

export const getAllServices = async(token) => {
    const response =  await servicesApi.get('/', 
    {headers: {'Authorization': token}}
    );
    return response.data
}
export const createUpdateService = async(payload) => {
    var response = {}

    if (payload.slug){
        response =  await servicesApi.put('/'+payload.slug+'/' ,
        payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }
    else{
        response =  await servicesApi.post('/',payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }

    return response.data
}
export const deleteService = async(payload) => {
    const response =  await servicesApi.delete('/'+payload.slug+'/',
    {headers: {'Authorization': payload.token}}
    );
    return response.data
}


