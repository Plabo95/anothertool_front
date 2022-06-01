import { base_url } from '../environment/global';

const getAllUsers = async (user, authTokens) => {
    const data = await fetch(base_url+'users',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    return data;  
}

const updateUser = async (user, authTokens) => {
    const data = await fetch(base_url+'updateuser/'+ user.id,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        },
        body: JSON.stringify(user)
    })
    return data;
}

const deleteUser = async (id, authTokens) => {
    const data = await fetch(base_url+'deleteuser/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    data.noJson = true;
    return data;
}


export default {
    getAllUsers,
    updateUser,
    deleteUser,
};