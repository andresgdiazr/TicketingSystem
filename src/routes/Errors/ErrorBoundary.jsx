import React from 'react'
import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {

  const error = useRouteError();
  error ? console.error(error) : console.log('no hay un error especifico');
    
  return (
    <div>
      {`Ocurrio un error cargando la ruta ${error?.error ? error.error.message : ''}`}
    </div>
  )
}
