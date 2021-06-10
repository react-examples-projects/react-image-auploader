import Btn from "../../Elements/Btn";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useTitle from "../../Hooks/useTitle";
import Loader from "react-loader-spinner";
import css from "./MyPerfil.module.scss";
import { BiImageAdd, BiUserCheck } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { setPerfilPhoto } from "../../../Helpers/api";
import { useMutation } from "react-query";

function MyPerfil() {
  const { user, setUser } = useCurrentUser();
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

  return (
    <div className={css.container}>
      <div className={css.columns}>
        <div className={css.column}>
          <div className={css.perfilContainer}>
            <img className={css.perfil} src={user.perfil_photo} alt="" />
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

          <div className="group">
            <BiImageAdd className="groupIcon" />
            <input
              type="file"
              className={css.file}
              onChange={onChangePerfilPhoto}
            />
          </div>
        </div>
        <div className={css.column}>
          <h1 className={css.username}>{user.name}</h1>

          <div className="group">
            <AiOutlineMail className="groupIcon" />
            <input type="text" defaultValue={user.email} disabled />
          </div>

          {user.isAdmin && (
            <div className="group">
              <BiUserCheck className="groupIcon" />
              <input type="text" defaultValue="Administrador" disabled />
            </div>
          )}

          <Btn>Cambiar contraseña</Btn>
        </div>
      </div>
    </div>
  );
}

export default MyPerfil;
