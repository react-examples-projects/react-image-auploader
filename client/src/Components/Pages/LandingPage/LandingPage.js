import React from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgLanding from "../../../Images/landing.jpg";
import css from "./LandingPage.module.scss";
import cls from "classnames";

export default function LandingPage() {
  return (
    <Row className="w-100 h-100 p-0 m-0">
      <Col
        md={6}
        lg={6}
        className={cls("p-0 m-0 d-flex align-items-center", css.main)}
      >
        <main style={{ padding: "0 4rem" }}>
          <div>
            <h1 className="title" style={{ fontSize: "4rem" }}>
              Manjuro
            </h1>
            <h2 className={cls("lead mt-4", css.subtitle)}>
              El lugar donde se expresa tu creatividad
            </h2>
            <Button size="lg" className={css.btn} as={Link} to="/login">
              Iniciar
            </Button>
          </div>
        </main>
      </Col>

      <Col md={6} lg={6} className="d-none d-md-flex p-0 m-0">
        <Image
          src={imgLanding}
          className="w-100 vh-100"
          style={{ objectFit: "cover" }}
          fluid
        />
      </Col>
    </Row>
  );
}
