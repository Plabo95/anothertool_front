const base_url = 'http://127.0.0.1:8000/api/'
//const base_url = 'https://plabo95.github.io/klndr_front/api/'

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



export default {
    getAllEvents,
    getNextEvents
  };