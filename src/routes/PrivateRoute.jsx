import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUsersContext } from "../hooks/UsersContext";
import Swal from "sweetalert2";

const PrivateRoute = ({ roles }) => {
  const user = useUsersContext();
  if (!user.token) {
    // cuando no hay token = no logeado
    return <Navigate to="/login" />;
  } else if (roles && roles.length != 0 && !roles.includes(user.role)) {
    // cuando hay roles y no está en el array de roles, no tiene permisos
    Swal.fire({
      position: "top",
      icon: "info",
      title: "No está autorizado para acceder a esta sección",
      showConfirmButton: false,
      timer: 3500,
    });
    return <Navigate to="/" />;
  } else {
    // cuando está logeado y tiene permisos
    return <Outlet />
  }
};

export default PrivateRoute;
