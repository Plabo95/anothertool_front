import {base_url} from '../environment/global';


const getAllCars = async (user, authTokens)=>{
    const data = await fetch(base_url+"cars/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }
    })   
    return data;
}

const deleteCar = async (id, user, authTokens) => {
    const data = await fetch(base_url+'deletecar/'+user.user_id+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    data.noJson = true;
    return data;
}

const createCar = async (car, carToCreate, user,authTokens) => {
    var url=''
    if(car === undefined){ 
            url = base_url+'createcar'}   
    else{   url = base_url+'updatecar/'+ user.user_id + '/' + car.id}
    const data = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        },
        body: JSON.stringify(carToCreate)
    })
    return data;
}



export default {
    getAllCars,
    deleteCar,
    createCar
    
  };