import { useState, useEffect } from "react";
// importar de firebase
import { useFetch } from "../../hooks/useFetch";
import { useUsersContext } from "../../hooks/UsersContext";
import { Navigate } from "react-router-dom";

const Login = ({ title }) => {
  const user = useUsersContext();

  // TODO las alertas, los mensajes de error
  // los las redirecciones no se esperan a que se termine de validar
  // si tengo data guardada en el localstorage entonces no deberia de pedir el login
  const loginWithGoogle = async () => {
    await user.login();
  };

  return (
    <div className="new">
      {user.token ? (
        <div>
          <h1>¡Bienvenido! Redirigiendo a home</h1>
          <Navigate to="/" />
        </div>
      ) : (
        <button onClick={loginWithGoogle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"> {/* TODO mejorar estilos */}
          Iniciar sesión con cuenta de Google
        </button>
      )}
    </div>
  );
};

export default Login;
