import axios from "axios";

const clientsApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'clients'
})

export const getAllClients = async(credentials) => {
    const response =  await clientsApi.get('/', credentials);
    return response.data
}

export const createUpdateClient = async(payload) => {
    var response = {}

    if (payload.slug){
        response =  await clientsApi.put('/'+payload.slug+'/' ,
        payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }
    else{
        response =  await clientsApi.post('/',payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }

    return response.data
}
export const deleteClient = async(payload) => {
    const response =  await clientsApi.delete('/'+payload.slug+'/',
    {headers: {'Authorization': payload.token}}
    );
    return response.data
}


