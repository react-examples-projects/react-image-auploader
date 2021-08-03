import React from "react";
import useBody from "../../Hooks/useBody";
import ErrorImage from "../../../Images/error_boundary.jpg";
import ErrorContent from "./ErrorContent";

export default function PageError() {
  useBody({
    backgroundImage: `linear-gradient(140deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.85)), url(${ErrorImage})`,
    backgroundSize: "cover",
  });
  return (
    <div
      className="vh-100 w-100 mx-auto d-flex flex-column justify-content-center align-items-center text-center text-md-left"
      style={{ maxWidth: "800px" }}
    >
      <h1 className="title">Algo no estal bien...</h1>

      <ErrorContent />
    </div>
  );
}
