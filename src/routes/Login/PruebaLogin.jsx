import { useState, useEffect } from "react";
// importar de firebase
import { useFetch } from "../../hooks/useFetch";

const PruebaLogin = ({ token }) => {
  // TODO cambiar por el estado de autenticación
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/v2/pepe`;

  let { data, getData } = useFetch(null);

  // fetch alguna data del server para probar
  const fetchData = async (token) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const response = await fetch(api, options);
    const responseData = await response.json();
    const result = {
      status: response.status,
      data: await responseData,
    };
    console.log(result)
    return result;
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  return (
    <div className="new">
      <p>Esta es la lista de cosas: </p>
    </div>
  );
};

export default PruebaLogin;
