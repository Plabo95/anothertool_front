import axios from "axios";

const invoicesApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'invoices'
})

export const getAllInvoices = async(token) => {
    const response =  await invoicesApi.get('/', 
    {headers: {'Authorization': token}}
    );
    return response.data
}

export const getInvoiceOptions = async(token) => {
    const response =  await invoicesApi.options('/', 
    {headers: {'Authorization': token}}
    );
    return response.data
}


export const createUpdateInvoice = async(payload) => {
    var response = {}
    if (payload.slug){
        response =  await invoicesApi.put('/'+payload.slug+'/' ,
        payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }
    else{
        response =  await invoicesApi.post('/',payload.data,
        {headers: {'Authorization': payload.token}}
        );
    }

    return response.data
}