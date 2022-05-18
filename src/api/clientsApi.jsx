const local = 'http://127.0.0.1:8000/api/'
const live = 'https://plabo.pythonanywhere.com/api/'

const base_url = local

const getAllClients=(user, authTokens)=>(
    fetch(base_url+"clients/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }})   
    )

const deleteClient = (id, user, authTokens) => {
    fetch(base_url+'deleteclient/'+user.user_id+'/'+id+'/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    }

const createClient = (client, clientToCreate, user,authTokens) => {
    var url=''
    if(client === undefined){ 
            url = base_url+'createclient/'}   
    else{   url = base_url+'updateclient/'+ user.user_id + '/' + client.id+'/'}
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        },
        body: JSON.stringify(clientToCreate)
        })
    }

export default {
    getAllClients,
    deleteClient,
    createClient
  };