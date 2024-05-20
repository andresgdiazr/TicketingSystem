import React, { createContext, useContext, useState, useEffect } from "react";

const UsersContext = createContext();
import { auth as fireAuth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import Swal from "sweetalert2";

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("user") ? localStorage.getItem("user") : null;
  }); // no se para que lo quiero
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") ? localStorage.getItem("token") : null;
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") ? localStorage.getItem("role") : null;
  });

  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/v2/user/login`;

  // esto quizas pueda eliminarse de aqui y usar el fetchData de hooks
  // pero si se hace hay una especie de recursion entre que fetchData
  // necesita el token y el token necesita fetchData
  const fetchData = async (token) => {
    const options = {
      method: "POST",
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
    return result;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, (auth) => {
      if (auth) {
        auth
          .getIdToken()
          .then(async (token) => {
            if (!token) {
              return;
            }
            const resp = await fetchData(token);
            if (resp.status == 200) {
              const backtoken = token;
              const backrole = resp.data.data.role;
              localStorage.setItem("token", backtoken);
              localStorage.setItem("role", backrole);
              setToken(backtoken);
              setRole(backrole);
              return;
            } else {
              logout();
              Swal.fire({
                title: "Oops...",
                text: "No se encuentra registrado en el sistema",
              });
            }
          })
          .catch((error) => {
            logout();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo salió mal al reautenticar",
            });
          });
      } else {
        // si no hay usuario, el logout es solo para limpiar el estado
        logout();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(fireAuth, provider)
      .then(async (result) => {
        if (!result.user) {
          return false;
        }
        return true;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal",
        });
      });
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    await fireAuth.signOut();
  };

  return (
    <UsersContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;

export const useUsersContext = () => {
  return useContext(UsersContext);
};
