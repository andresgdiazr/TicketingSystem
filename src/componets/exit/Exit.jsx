import React, { useEffect } from "react";

function Exit() {
  const handleExit = () => {
    // window.close();
    window.location.href = "/";
  };
  useEffect(() => {
    handleExit();
  }, []);
}
export default Exit;
