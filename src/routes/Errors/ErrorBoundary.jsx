import React from 'react'
import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {

  const error = useRouteError();
  console.error(error);
    
  return (
    <div>
      {`Ocurrio un error cargando la ruta ${error.error.message}`}
    </div>
  )
}
