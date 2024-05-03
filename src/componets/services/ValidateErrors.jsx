import React from "react";
import "./services.css";
function ValidateErrors({ errors }) {
  return ( 
    <>
      {errors &&
        errors.map((error, index) => (
          <p key={index} className="input-message-error">
            {error}
          </p>
        ))}
    </>
  );
}
export default ValidateErrors;
