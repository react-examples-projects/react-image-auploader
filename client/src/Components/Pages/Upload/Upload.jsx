import { memo, useRef } from "react";
import css from "../Style.module.scss";
import { BiImages } from "react-icons/bi";
import Btn from "../../Elements/Btn";
import { uploadImage } from "../../../Helpers/api";
import ErrorText from "../../Elements/ErrorText";
import { useMutation } from "react-query";
import Loader from "react-loader-spinner";
import useCurrentUser from "../../Hooks/useCurrentUser";

function Upload({ setImagesArray }) {
  const inputFiles = useRef(null);
  const { user } = useCurrentUser();
  const { isError, isLoading, mutateAsync } = useMutation((payload) =>
    uploadImage(payload)
  );

  async function handleOnSubmit(e) {
    e.preventDefault();
    const payload = new FormData(e.target);
    payload.append("name", user.name);
    const res = await mutateAsync(payload);
    const newImage = {
      url_image: res?.data.url,
      name: user.name,
    };
    setImagesArray((images) => [newImage, ...images]);
    if (inputFiles.current) inputFiles.current.value = null;
  }

  return (
    <div className={css.container}>
      <h2>Subir imágenes</h2>
      <p className={css.lead}>
        Selecciona archivos de imágen, no deben de sobrepasar los{" "}
        <strong>3mb</strong> de peso.
      </p>

      <form
        autoComplete="off"
        onSubmit={handleOnSubmit}
        encType="multipart/form-data"
      >
        <div className="group">
          <BiImages className="groupIcon" />
          <input
            ref={inputFiles}
            type="file"
            accept="image/*"
            name="images"
            id="images"
            required
            multiple
          />
        </div>

        <ErrorText
          isVisible={isError}
          text="Ocurrió un error, verifica tu conexión."
        />
        <div className="group">
          <Btn type="submit" disabled={isLoading}>
            <div className={css.buttonContent}>
              <span>Subir</span>
              {isLoading && (
                <Loader height={20} width={20} color="#fff" type="Oval" />
              )}
            </div>
          </Btn>
        </div>
      </form>
    </div>
  );
}

export default memo(Upload);
