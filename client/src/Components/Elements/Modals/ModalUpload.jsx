import { useRef, useState } from "react";
import css from "../../Pages/Style.module.scss";
import { BiImages } from "react-icons/bi";
import Btn from "../Btn";
import ErrorText from "../ErrorText";
import Loader from "react-loader-spinner";
import useUploadImage from "../../Hooks/useUploadImage";
import PropTypes from "prop-types";

function Upload({ setImagesArray, toggleOpen }) {
  const inputFiles = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { upload, isError, isLoading } = useUploadImage();

  async function handleOnSubmit(e) {
    e.preventDefault();
    const newImage = await upload(e.target);
    setImagesArray((images) => [newImage, ...images]);
    toggleOpen();
    if (inputFiles.current) inputFiles.current.value = null;
  }

  function handleOnChangeFile(e) {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const fr = new FileReader();
      fr.onload = () => setImagePreview(fr.result);
      return fr.readAsDataURL(file);
    }
    setImagePreview(null);
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
            onChange={handleOnChangeFile}
            disabled={isLoading}
            required
            multiple
          />
        </div>

        <ErrorText
          isVisible={isError}
          text="Ocurrió un error, verifica tu conexión."
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="It will upload to server"
            title="It will upload to server"
          />
        )}

        <div className="group">
          <Btn type="submit" disabled={isLoading}>
            <div className={css.buttonContent}>
              {isLoading ? (
                <Loader height={20} width={20} color="#fff" type="Oval" />
              ) : (
                <span>Subir</span>
              )}
            </div>
          </Btn>
        </div>
      </form>
    </div>
  );
}

Upload.propTypes = {
  setImagesArray: PropTypes.func.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

export default Upload;
