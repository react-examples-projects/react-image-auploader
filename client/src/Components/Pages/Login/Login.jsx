import useBody from "../../Hooks/useBody";
import bg_login from "../../../Images/bg_login2.jpg";
import { setToken } from "../../../Helpers/token";
import ErrorText from "../../Elements/ErrorText";
import BtnLoader from "../../Elements/BtnLoader";
import css from "../Style.module.scss";
import useAuth from "../../Hooks/useAuth";
import useCurrentUser from "../../Hooks/useCurrentUser";

import { useState } from "react";
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
  useBody(cssBody);
  const [validated, setValidated] = useState(false);
  const { setUser } = useCurrentUser();
  const [auth, setAuth] = useState({ email: "", password: "" });
  const login = useAuth();
  const { push } = useHistory();

  function handleOnChange({ target }) {
    const { name, value } = target;
    setAuth((a) => ({ ...a, [name]: value }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) return setValidated(true);
    setValidated(false);

    const res = await login.mutateAsync(auth);
    if (res.ok) {
      setToken(res.data.token);
      setUser(res.data.user);
      setTimeout(() => push("/home"), 150);
    }
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
            type="text"
            name="email"
            placeholder="Email"
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
            onChange={handleOnChange}
            value={auth.password}
            required
          />
        </Form.Group>
        <ErrorText
          isVisible={login.isError}
          text="Ocurrió un error, verifica tus datos."
        />
        <BtnLoader text="Iniciar" isLoading={login.isLoading} block />
        <small className={cs(css.lead, "text-center")}>
          Si no tienes cuenta, puedes crearla <Link to="/signup">aca</Link>.
        </small>
      </Form>
    </div>
  );
}
