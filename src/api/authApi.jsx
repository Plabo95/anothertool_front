import { base_url } from '../environment/global';

//no funciona no se xq daun error
const loginUser = async (credentials) => {
    const data = await fetch(base_url+'token/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': credentials.username,
            'password': credentials.password,
        })
        })
    return data;  
}




export default {
    loginUser,
};