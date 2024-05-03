import React, { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => {
  return useContext(AppContext);
}; 
export const AppContextProvider = ({ children }) => {
  const HandleNivelClose = async () => {
    const miModal = document.getElementById("modalDos");
    miModal.classList.add("fadeOut");
    miModal.addEventListener("animationend", (e) => {
      const div_root = document.getElementById("modalDos");
      div_root.remove();
    });
  };
  return (
    <AppContext.Provider value={{ HandleNivelClose }}>
      {children}
    </AppContext.Provider>
  );
};
