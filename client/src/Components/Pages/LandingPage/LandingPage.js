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
        md={7}
        lg={6}
        className={cls("p-0 m-0 d-flex align-items-center", css.main)}
      >
        <main style={{ padding: "0 4rem" }}>
          <p>
            <h1 className="title" style={{ fontSize: "4rem" }}>
              Manjuro
            </h1>
            <h2 className="text-muted lead mt-4" style={{ fontSize: "2rem" }}>
              Un lugar donde puedes expresarte y dar a conocer tus ideas y
              proyectos
            </h2>
            <Button size="lg" className={css.btn} as={Link} to="/login">
              Iniciar
            </Button>
          </p>
        </main>
      </Col>

      <Col md={5} lg={6} className="p-0 m-0">
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
