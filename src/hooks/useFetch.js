import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(true);
 
  const fetchData = async (url, method = "GET", formData = null) => {
    setIsloading(true);
    try {
      if (!formData?.file) {
        const options = {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: formData ? JSON.stringify(formData) : null,
        };
        const response = await fetch(url, options);
        const responseData = await response.json();
        const result = {
          status: response.status,
          data: await responseData,
        };
        setData(result);
        return result;
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        const data = {
          status: 500,
          message: "No se pudo establecer conexión con el servidor",
          exito: false,
          errorSystem: await error.message,
        };
        setData(data);
      }
    } finally {
      setIsloading(false);
    }
  };

  const getData = async (url) => {
    const resp = await fetchData(url);
    return resp;
  };

  const createData = async (url, formData) => {
    const resp = await fetchData(url, "POST", formData);
    return resp;
  };

  const updateData = async (url, dataId, formData) => {
    const resp = await fetchData(`${url}/${dataId}`, "PUT", formData);
    return resp;
  };

  const deleteData = async (url, dataId) => {
    const resp = await fetchData(`${url}/${dataId}`, "DELETE");
    return resp;
  };

  const envioCorreo = async (url, formData) => {
    const resp = await fetchData(url, "POST", formData);
    const salidaOk = {
      message: "Registro agregado con éxito",
    };
    const data = {
      status: 201,
      data: salidaOk,
      exito: true,
    };
    setData(data);
    return resp;
  };
  return {
    data,
    isLoading,
    getData,
    createData,
    updateData,
    deleteData,
    envioCorreo,
  };
};
