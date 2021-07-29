import useCurrentUser from "../../Hooks/useCurrentUser";
import useTitle from "../../Hooks/useTitle";
import Loader from "react-loader-spinner";
import css from "./MyPerfil.module.scss";
import { setPerfilPhoto } from "../../../Helpers/api";
import { useMutation } from "react-query";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import useLazyloadImage from "../../Hooks/useLazyloadImage";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function MyPerfil() {
  const buttonFile = useRef(null);
  const { user, setUser } = useCurrentUser();
  const src = useLazyloadImage({ src: user.perfil_photo });
  const { isLoading, mutateAsync } = useMutation((payload) =>
    setPerfilPhoto(payload)
  );

  useTitle("Perfil de " + user.name);

  const onChangePerfilPhoto = async ({ target }) => {
    const formData = new FormData();
    formData.append("perfil_photo", target.files[0]);
    formData.append("id", user._id);
    const data = await mutateAsync(formData);
    setUser({ perfil_photo: data.url });
  };

  const onOpenFileChooser = () => {
    buttonFile.current && buttonFile.current.click();
  };

  return (
    <div className="container position-relative">
      <Button
        variant="outline-secondary"
        as={Link}
        to="/home"
        className="position-absolute"
        size="sm"
        style={{ top: "15%", left:"-60px" }}
      >
        <BiArrowBack />
      </Button>

      <div className="row justify-content-center align-items-center mt-5">
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
          />
        </div>
        <div className="col-auto">
          <h4 className="mb-3 font-weight-bold">{user.name}</h4>

          <p>{user.email}</p>
          {user.isAdmin && (
            <h6 className="text-warning font-weight-bold my-2">
              Administrador
            </h6>
          )}
          <div className="mt-4">
            <Button variant="outline-success mr-2">Cambiar contraseña</Button>
            <Button variant="outline-success mr-2" onClick={onOpenFileChooser}>
              Cambiar Imágen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPerfil;
