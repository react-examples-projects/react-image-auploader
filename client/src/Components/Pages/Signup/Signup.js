import useBody from "../../Hooks/useBody";
import bg_signup from "../../../Images/bg_signup.jpg";
import ErrorText from "../../Elements/ErrorText";
import BtnLoader from "../../Elements/BtnLoader";
import css from "../../../Style/Modal.module.scss";
import useTitle from "../../Hooks/useTitle";
import useSignup from "../../Hooks/auth/useSignup";
import useCaptcha from "../../Hooks/useCaptcha";
import { getErrorValidation } from "../../../Helpers/utils";
import Catpcha from "../../Elements/Catpcha";
import { signupUser } from "../../../Helpers/api";

import { useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import cs from "classnames";

const cssBody = {
  background: `linear-gradient(140deg, #00000003, #0000009e), url('${bg_signup}')`,
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Signup() {
  useTitle("Registrate");
  useBody(cssBody);
  const captchaRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const { isValidCaptcha, handleChangeCaptcha, handleExpireCaptcha } =
    useCaptcha(captchaRef);
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });
  const signup = useSignup();
  const { push } = useHistory();
  const loginError = getErrorValidation(signup);

  function handleOnChange({ target }) {
    const { name, value } = target;
    setAuth((a) => ({ ...a, [name]: value }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity() || !isValidCaptcha) return setValidated(true);
    setValidated(false);

    const res = await signupUser(auth);
    if (res.ok) {
      push("/login");
    }
  }

  return (
    <div className={cs(css.container, css.containerCenter)}>
      <h4 className="text-center font-weight-bold">Regístrate</h4>
      <p className={cs(css.lead, "text-center")}>
        Recuerda rellenar correctamente los campos
      </p>

      <Form
        autoComplete="off"
        onSubmit={handleOnSubmit}
        validated={validated}
        noValidate
      >
        <Form.Group controlId="name">
          <Form.Control
            type="text"
            name="name"
            placeholder="Nombre de usuario"
            title="Debes de colocar tu nombre de usuario"
            arial-label="Debes de colocar tu nombre de usuario"
            onChange={handleOnChange}
            value={auth.name}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Control
            type="text"
            name="email"
            placeholder="Email"
            title="Debes de colocar tu correo elétronico"
            arial-label="Debes de colocar tu correo elétronico"
            onChange={handleOnChange}
            value={auth.user}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            title="Debes de colocar tu contraseña"
            arial-label="Debes de colocar tu contraseña"
            minLength={6}
            maxLength={20}
            onChange={handleOnChange}
            value={auth.password}
            required
          />
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Control
            type="password"
            name="passwordConfirm"
            placeholder="Password Confirm"
            title="Debes de confirmar tu contraseña"
            arial-label="Debes de confirmar tu contraseña"
            minLength={6}
            maxLength={20}
            onChange={handleOnChange}
            value={auth.passwordConfirm}
            required
          />
        </Form.Group>

        <div className="d-flex mt-1 mb-2">
          <Catpcha
            ref={captchaRef}
            onChange={handleChangeCaptcha}
            onExpired={handleExpireCaptcha}
          />
        </div>

        <ErrorText isVisible={signup.isError} text={loginError} />

        <BtnLoader
          text="Registrarme"
          isLoading={signup.isLoading}
          disabled={!isValidCaptcha}
          block
        />

        <small className={cs(css.lead, "text-center")}>
          Si tienes cuenta, entra <Link to="/login">aca</Link>.
        </small>
      </Form>
    </div>
  );
}
