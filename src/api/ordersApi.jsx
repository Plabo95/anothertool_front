import axios from "axios";

const ordersApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'orders'
})

export const getAllOrders = async(payload) => {
    var url ='/'
    if (payload.filter){
        url = '/?status='+payload.filter 
    }
    const response =  await ordersApi.get(url,
    {headers: {'Authorization': payload.auth}}
    );
    return response.data
}

export const getLatestOrders = async(payload) => {
    const response =  await ordersApi.get('/?latest='+payload.number, 
    {headers: {'Authorization': payload.auth}}
    );
    return response.data
}

export const getOrderOptions = async(token) => {
    const response =  await ordersApi.options('/', 
    {headers: {'Authorization': token}}
    );
    return response.data
}

export const createUpdateOrder= async(payload) => {
    var response = {}
    if (payload.slug){
        response =  await ordersApi.patch('/'+payload.slug+'/' ,
        payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }
    else{
        response =  await ordersApi.post('/',payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }

    return response.data
}
export const deleteOrder = async(payload) => {
    const response =  await ordersApi.delete('/'+payload.slug+'/',
    {headers: {'Authorization': payload.token}}
    );
    return response.data
}


