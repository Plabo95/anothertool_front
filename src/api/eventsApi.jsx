import {base_url} from '../environment/global';

const getAllEvents=(user, authTokens)=>(
    fetch(base_url+"events/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }})   
    )

const getNextEvents=(user, authTokens)=>(
    fetch(base_url+"nextevents/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }})   
    )

const createEvent = (is_creating, event, user,authTokens) => {
    var url=''
    if(is_creating){ 
            url = base_url+'createevent/'+user.user_id+'/'}   
    else{   url = base_url+'updateevent/'+ user.user_id + '/' +event.id}
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        },
        body: JSON.stringify(event)
        })
    }
const deleteEvent = (id, user, authTokens) => {
    fetch(base_url+'deleteevent/'+user.user_id+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    }


export default {
    getAllEvents,
    getNextEvents,
    createEvent,
    deleteEvent,
  };