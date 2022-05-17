import { useState, useContext } from "react";
import AuthContext from "../auth/AuthContext";

export default (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {logoutUser} = useContext(AuthContext)

  const request = async (...props) => {
    setLoading(true);
    try {
      const response = await apiFunc(...props)
      if (response.ok) {
        const newdata = await response.json();
        setData(newdata);
        setError(null);
        setLoading(false);
      }
      else if (response.statusText === 'Unauthorized') {
        console.log('No autorizado, loggin out...')
        logoutUser()
      }
      else {
        setError("Hubo un error al obtener los datos");
      } 
    } catch (err) {
      setError(err.message || "Error en solicitud post!");
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    error,
    loading,
    request
  };
};
