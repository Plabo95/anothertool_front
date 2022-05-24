import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

export default function useApi(apiFunc){
  let data = null;
  let error = null;
  const {logoutUser} = useContext(AuthContext)

  const request = async (...props) => {
    try {
      const response = await apiFunc(...props)
      if (response.statusText.toUpperCase() !== 'ERROR') {
        if(response.noJson){
            error = null;
        }else{
            data = await response.json();
            console.log('data',data)
            error = null;
        }
      }
      else if (response.statusText === 'Unauthorized') {
        console.log('No autorizado, loggin out...')
        logoutUser()
      }
      else {
        error = {status: response.status, statusText: response.statusText};
      } 
    } catch (err) {
        error = err.message || "Error en solicitud post!"; 
    } finally {
      console.log(data,error)
        return {data, error}
    }
  };
  return {
    request
  }
};

