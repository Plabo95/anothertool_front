import {base_url} from '../environment/global';


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