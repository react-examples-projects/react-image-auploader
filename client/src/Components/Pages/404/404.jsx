import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import useCurrentUser from "../../Hooks/user/useCurrentUser";
import useBody from "../../Hooks/useBody";
import notFoundBg from "../../../Images/404.jpg";
import css from "./NotFound.module.scss";

export default function NotFound() {
  const { user } = useCurrentUser();
  useBody({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(140deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.85)), url("${notFoundBg}")`,
    backgroundSize: "cover",
    height: "100vh",
  });

  return (
    <div className={css.container}>
      <h1 className="title mb-3" style={{ fontSize: "4rem" }}>
        No encontrado
      </h1>
      <p>
        La página que estás intentando acceder no se encuentra o sea ha borrado.
        Puede ser un problema de nosotros, si es así, intenta comunicarte con
        nosotros a través de nuestro soporte.
      </p>

      <Link to={user?._id ? "/home" : "/"}>
        <Button>Regresar al {user?._id ? "inicio" : "login"}</Button>
      </Link>
    </div>
  );
}
