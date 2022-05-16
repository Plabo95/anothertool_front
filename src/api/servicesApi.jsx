const base_url = 'http://127.0.0.1:8000/api/'

const getAllServices=(user, authTokens)=>(
    fetch(base_url+"services/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }})   
    )




export default {
    getAllServices,
    
  };