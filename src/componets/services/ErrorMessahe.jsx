import React from "react";
import "./errorMessage.css";

function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="error-message">
      <p>{message}</p>
      <button className="dismiss-button" onClick={onDismiss}>
        Dismiss
      </button>
    </div>
  ); 
}

export default ErrorMessage;
