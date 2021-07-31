import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import useCurrentUser from "../../Hooks/useCurrentUser";
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
        Not Found
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore fuga in
        ex tempora commodi tenetur praesentium debitis pariatur recusandae
        dignissimos!
      </p>

      <Link to={user.id ? "/home" : "/"} >
        <Button size="lg">Regresar al {user._id ? "inicio" : "login"}</Button>
      </Link>
    </div>
  );
}
