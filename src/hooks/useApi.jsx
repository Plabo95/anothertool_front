import { useState } from "react";

export default (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    try {
      const response = await apiFunc(...args);
      console.log(response)
      if (response.ok) {
        const newdata = await response.json();
        console.log(newdata)
        setData(newdata);
        setError(null);
        setLoading(false);
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
