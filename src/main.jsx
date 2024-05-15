import React from "react";
import ReactDOM from "react-dom/client";
import { AppContextProvider } from "./hooks/appContext.jsx";
import { RouterProvider } from 'react-router-dom';
import { UsersProvider } from './hooks/UsersContext';
import router from './routes/index';
import './index.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </AppContextProvider>
  </React.StrictMode>
);
