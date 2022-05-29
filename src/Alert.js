import React, { useEffect } from "react";

const Alert = ({ msg, style, removeAlert, list }) => {
  //removeAlert initial state is false, so it doesn't show
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <div className="alert-container">
      <p style={{ backgroundColor: `${style}` }}>{msg}</p>
    </div>
  );
};

export default Alert;
