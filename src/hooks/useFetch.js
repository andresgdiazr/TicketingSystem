import { useState, useEffect } from "react";
import { useUsersContext } from "./UsersContext";


export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const user = useUsersContext();
  const fetchData = async (url, method = "GET", formData = null) => {
    setIsloading(true);
    try {
      if (!formData?.file) {
        const options = {

          method: method,

          headers: user?.token ? {
            "Content-Type": "application/json",
            Authorization: user.token,
          } : {
            "Content-Type": "application/json",
          },

          body: formData ? JSON.stringify(formData) : null,
        };
        const response = await fetch(url, options);
        const responseData = await response.json();
        const result = {
          status: response.status,
          data: await responseData,
        };

        if(response.status === 403){
          const data = {
            status: 403,
            message: "Usuario no tiene permiso",
            exito: false,
            errorSystem: await result.data.message,
          };
          setData(data);
          return null;
        }

        setData(result);
        return result;
      }
    } catch (error) {
      console.error(error)
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

  const getDataSelected = async (url,id) =>{
    const resp = await fetchData(`${url}/${id}`, "GET");
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

  const updateDatas = async (url, formData) => {
    const resp = await fetchData(url, "PUT", formData);
    return resp;
  }

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
    updateDatas,
    getDataSelected,
  };
};
