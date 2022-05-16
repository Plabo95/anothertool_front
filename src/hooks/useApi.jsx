import { useState } from "react";

export default (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...props) => {
    setLoading(true);
    console.log('fetchin data')
    try {
      const response = await apiFunc(...props)
      if (response.ok) {
        const newdata = await response.json();
        setData(newdata);
        setError(null);
        setLoading(false);
      }
      else {
        setError("Hubo un error al obtener los datos");
      } 
    } catch (err) {
      setError(err.message || "Error en solicitud post!");
      console.log(error)
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
