import {base_url} from '../environment/global';


const getAllItems = async (user, authTokens)=>{
    const data = await fetch(base_url+"items/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }
    })   
    return data;
}

const deleteItem = async (id, user, authTokens) => {
    const data = await fetch(base_url+'deleteitem/'+user.user_id+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    data.noJson = true;
    return data;
}

const createItem = async (item, itemToCreate, user,authTokens) => {
    var url=''
    if(item === undefined){ 
            url = base_url+'createitem'}   
    else{   url = base_url+'updateitem/'+ user.user_id + '/' + item.id}
    const data = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        },
        body: JSON.stringify(itemToCreate)
    })
    return data;
}



export default {
    getAllItems,
    deleteItem,
    createItem
    
  };