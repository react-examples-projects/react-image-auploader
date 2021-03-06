import useBody from "../../Hooks/useBody";
import bg_login from "../../../Images/bg_login2.jpg";
import { setToken } from "../../../Helpers/token";
import ErrorText from "../../Elements/ErrorText";
import BtnLoader from "../../Elements/BtnLoader";
import css from "../../../Style/Modal.module.scss";
import useTitle from "../../Hooks/useTitle";
import useLogin from "../../Hooks/auth/useLogin";
import useCurrentUser from "../../Hooks/user/useCurrentUser";
import useCaptcha from "../../Hooks/useCaptcha";
import Catpcha from "../../Elements/Catpcha";
import { getErrorValidation } from "../../../Helpers/utils";
import { validateLogin } from "../../../Helpers/validations";

import { useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import cs from "classnames";

const cssBody = {
  background: `linear-gradient(140deg, #00000003, #0000009e), url('${bg_login}')`,
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Login() {
  useTitle("Iniciar sesión");
  useBody(cssBody);
  const captchaRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const { setUser } = useCurrentUser();
  const [auth, setAuth] = useState({ email: "", password: "" });
  const { isValidCaptcha, handleChangeCaptcha, handleExpireCaptcha } =
    useCaptcha(captchaRef);
  const login = useLogin();
  const { push } = useHistory();
  const loginError = getErrorValidation(login);

  function handleOnChange({ target }) {
    const { name, value } = target;
    setAuth((a) => ({ ...a, [name]: value }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    setErrorForm(null);
    if (!isValidCaptcha) return;
    
    validateLogin(e.target).then(
      async () => {
        setValidated(true);
        const res = await login.mutateAsync(auth);
        if (res.ok) {
          setToken(res.data.token);
          setUser(res.data.user);
          push("/home");
        }
      },
      (err) => setErrorForm(err.message)
    );
  }

  return (
    <div className={cs(css.container, css.containerCenter)}>
      <h4 className="text-center font-weight-bold">Inicia Sesión</h4>
      <p className={cs(css.lead, "text-center")}>
        Necesitas tener una cuenta para acceder al contenido de esta página.
      </p>

      <Form
        autoComplete="off"
        onSubmit={handleOnSubmit}
        validated={validated}
        noValidate
      >
        <Form.Group controlId="email">
          <Form.Control
            type="email"
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

        <div className="d-flex mt-1 mb-2">
          <Catpcha
            ref={captchaRef}
            onChange={handleChangeCaptcha}
            onExpired={handleExpireCaptcha}
          />
        </div>

        <ErrorText
          isVisible={!!errorForm || login.isError}
          text={errorForm || loginError}
        />
        <BtnLoader
          text="Iniciar"
          isLoading={login.isLoading}
          disabled={!isValidCaptcha}
          block
        />
        <small className={cs(css.lead, "text-center")}>
          Si no tienes cuenta, puedes crearla <Link to="/signup">aca</Link>.
        </small>
      </Form>
    </div>
  );
}
