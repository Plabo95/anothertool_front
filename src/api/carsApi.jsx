import axios from "axios";

const carsApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'cars'
})

export const getAllCars = async(token) => {
    const response =  await carsApi.get('/', 
    {headers: {'Authorization': token}}
    );
    return response.data
}
export const createUpdateCar = async(payload) => {
    var response = {}

    if (payload.slug){
        response =  await carsApi.put('/'+payload.slug+'/' ,
        payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }
    else{
        response =  await carsApi.post('/',payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }

    return response.data
}
export const deleteCar = async(payload) => {
    const response =  await carsApi.delete('/'+payload.slug+'/',
    {headers: {'Authorization': payload.token}}
    );
    return response.data
}


