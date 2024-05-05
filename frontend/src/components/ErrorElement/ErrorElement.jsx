import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorElement = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/");

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: "1px" }}>404 Not Found</h1>
      <p
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={goBack}
      >
        Go Back
      </p>
    </div>
  );
};

export default ErrorElement;
