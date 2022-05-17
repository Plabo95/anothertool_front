const base_url = 'http://127.0.0.1:8000/api/'

const getAllClients=(user, authTokens)=>(
    fetch(base_url+"clients/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }})   
    )

const deleteClient = (id, user, authTokens) => {
    fetch(base_url+'deleteclient/'+user.user_id+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    }

export default {
    getAllClients,
    deleteClient,
    
  };