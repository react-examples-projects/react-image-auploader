import useCurrentUser from "../../Hooks/useCurrentUser";
import useTitle from "../../Hooks/useTitle";
import Loader from "react-loader-spinner";
import css from "./MyPerfil.module.scss";
import { setPerfilPhoto } from "../../../Helpers/api";
import { useMutation } from "react-query";
import { useRef } from "react";
import { Button, Form, Col } from "react-bootstrap";
import useLazyloadImage from "../../Hooks/useLazyloadImage";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import ImageList from "../../Elements/ImageList/ImageList";
import useImages from "../../Hooks/useImages";
import useToggle from "../../Hooks/useToggle";
import useChangePassword from "../../Hooks/useChangePassword";
import BtnLoader from "../../Elements/BtnLoader";
import ErrorText from "../../Elements/ErrorText";
import { getErrorValidation, isValidFile } from "../../../Helpers/utils";

function MyPerfil() {
  const buttonFile = useRef(null);
  const { user, setUser } = useCurrentUser();
  const { images } = useImages();
  const myImages = images?.filter((img) => img?.user?._id === user._id);
  const src = useLazyloadImage({ src: user.perfil_photo });
  const [isPasswordChange, togglePasswordChange] = useToggle();
  const { isLoading, mutateAsync, ...changeImageMutation } = useMutation(
    (payload) => setPerfilPhoto(payload)
  );
  const changePasswordMutation = useChangePassword();
  const passwordChangeError = getErrorValidation(
    changePasswordMutation,
    "Error al cambiar la contraseña"
  );
  const changeImageError = getErrorValidation(
    changeImageMutation,
    "Error al cambiar la imágen"
  );
  useTitle("Perfil de " + user.name);

  const onChangePerfilPhoto = async ({ target }) => {
    if (target.files.length) {
      const formData = new FormData();
      try {
        const profileImage = await isValidFile(target.files);
        formData.append("perfil_photo", profileImage[0]);
        const data = await mutateAsync(formData);
        setUser({ perfil_photo: data.url });
      } catch (err) {
        target.value = null;
      }
    }
  };

  const onOpenFileChooser = () => {
    buttonFile.current && buttonFile.current.click();
  };

  const changePassword = (e) => {
    e.preventDefault();
    const payload = new FormData(e.target);
    changePasswordMutation.mutateAsync(payload);
  };

  return (
    <div className="container position-relative">
      <Button
        variant="outline-secondary"
        as={Link}
        to="/home"
        className="position-absolute"
        size="sm"
        style={{ top: "3%", left: "-60px" }}
        title="Regresar al inicio"
        aria-label="Regresar al inicio"
      >
        <BiArrowBack />
      </Button>

      <div className="row justify-content-center align-items-center my-5">
        <div className="col-auto">
          <div className="w-auto position-relative overflow-hidden">
            <img
              className="img-fluid rounded-circle"
              src={src}
              alt="Your profile pic"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            {isLoading && (
              <>
                <div className={css.perfilLoaderOverlay} />
                <Loader
                  height={40}
                  width={40}
                  color="#fff"
                  type="Oval"
                  className={css.perfilLoader}
                />
              </>
            )}
          </div>

          <input
            type="file"
            onChange={onChangePerfilPhoto}
            ref={buttonFile}
            className="form-control-file d-none"
            accept="image/png, image/gif, image/jpeg, image/webp"
          />
        </div>
        <div className="col-auto text-center text-md-left mt-2 mt-md-0">
          <h4 className="mb-3 font-weight-bold">{user.name}</h4>

          <p>{user.email}</p>
          {user.isAdmin && (
            <h6 className="text-warning font-weight-bold my-2">
              Administrador
            </h6>
          )}
          <div className="mt-4">
            {isPasswordChange && (
              <Form autoComplete="off" onSubmit={changePassword}>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="password">
                      <Form.Control
                        name="password"
                        placeholder="Cambia tu contraseña"
                        type="password"
                        aria-label="Cambia tu contraseña"
                        size="sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="password-confirm">
                      <Form.Control
                        name="passwordConfirm"
                        placeholder="Confirma la contraseña"
                        type="password"
                        aria-label="Confirma la contraseña"
                        size="sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <BtnLoader
                  type="submit"
                  text="Guardar clave"
                  variant="success"
                  size="sm"
                  isLoading={changePasswordMutation.isLoading}
                  className="mb-3"
                  block
                />

                <ErrorText
                  text={passwordChangeError}
                  className="mb-3"
                  isVisible={changePasswordMutation.isError}
                />
              </Form>
            )}

            <ErrorText
              text={changeImageError}
              className="mb-3"
              isVisible={changeImageMutation.isError}
            />
            <Button
              variant="outline-success mr-2"
              onClick={togglePasswordChange}
            >
              {isPasswordChange ? "Cancelar" : "Cambiar contraseña"}
            </Button>
            <Button variant="outline-success mr-2" onClick={onOpenFileChooser}>
              Cambiar Imágen
            </Button>
          </div>
        </div>
      </div>

      <h2 className="title mb-4">Imágenes subidas</h2>
      <ImageList images={myImages} />
    </div>
  );
}

export default MyPerfil;
