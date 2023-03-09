import axios from "axios";

const invoicesApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL +'invoices'
})


export const getInvoiceOptions = async(token) => {
    const response =  await invoicesApi.options('/', 
    {headers: {'Authorization': token}}
    );
    return response.data
}