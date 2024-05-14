import { useState, useEffect } from "react";
// importar de firebase
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useFetch } from '../../hooks/useFetch';
import { auth as fireAuth } from "../../firebase";
import PruebaLogin from "./PruebaLogin"

const LoginA = ({ title }) => {
  // TODO cambiar por el estado de autenticación
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === 'true');
  const [token, setToken] = useState(null);

  // función para iniciar sesión con Google
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(fireAuth, provider)
      .then((result) => {
        if (result) {
          setAuth(result); // TODO cambiar por el estado de autenticación
          window.localStorage.setItem("auth", 'true');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // mantener la sesión iniciada
  // TODO cambiar
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, (auth) => {
      if (auth) {
        setAuth(auth);
        window.localStorage.setItem("auth", 'true');
        // obtener el token
        auth.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setAuth(null);
      }
    });
    return () => unsubscribe();
  });

  return (
    <div className="new">
      {auth ? (
        <div>
          <h1>¡Bienvenido!</h1>
          <PruebaLogin token={token}></PruebaLogin>
        </div>
      ) : (
        <button onClick={loginWithGoogle}>
          Iniciar sesión con cuenta de Google
        </button>
      )}
    </div>
  );
};

export default LoginA;
