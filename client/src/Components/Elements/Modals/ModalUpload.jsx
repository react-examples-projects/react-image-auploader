import css from "../../Pages/Style.module.scss";
import ErrorText from "../ErrorText";
import useUploadImage from "../../Hooks/useUploadImage";
import useImages from "../../Hooks/HooksStore/useImages";
import BtnLoader from "../BtnLoader";
import { imageToBase64, toFormData, isValidFile } from "../../../Helpers/utils";

import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { useRef, useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import TagsInput from "react-tagsinput";

function Upload({ toggleOpen }) {
  const inputFiles = useRef(null);
  const [tags, setTags] = useState([]);
  const [validated, setValidated] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { upload, isError, isLoading } = useUploadImage();
  const { addImage } = useImages();

  async function handleOnSubmit(e) {
    e.preventDefault();
    if (!e.target.checkValidity()) return setValidated(true);
    setValidated(false);

    const data = toFormData(e.target, { tags });
    const newImage = await upload(data);
    addImage(newImage);
    toggleOpen();
    if (inputFiles.current) inputFiles.current.value = null;
  }

  async function handleOnChangeFile(e) {
    if (e.target.files.length) {
      try {
        const images = await isValidFile(e.target.files);
        const imageUrl = await imageToBase64(images[0]);
        return setImagePreview(imageUrl);
      } catch (err) {
        e.target.value = null;
        setImagePreview(null);
      }
    }
    setImagePreview(null);
  }

  function handleOnChangeTag(tag) {
    setTags(tag);
  }

  return (
    <div className={css.container}>
      <h3 className="font-weight-bold">Subir imágenes</h3>
      <p className={css.lead}>
        Selecciona archivos de imágen, no deben de sobrepasar los{" "}
        <strong>3mb</strong> de peso.
      </p>

      <Form
        autoComplete="off"
        validated={validated}
        noValidate
        onSubmit={handleOnSubmit}
        encType="multipart/form-data"
      >
        <Form.Group controlId="title">
          <p className={css.lead}>
            Si no hay título, se marcará como "Sin título".
          </p>
          <Form.Control
            type="text"
            name="title"
            placeholder="Título de la públicación"
            title="Este título se mostrara al publicarse la imágen"
            aria-label="Título de la públicación"
            style={{ fontSize: "14px" }}
            disabled={isLoading}
          />
        </Form.Group>
        <Form.Group controlId="tags">
          <TagsInput
            value={tags}
            onChange={handleOnChangeTag}
            className="bg-transparent border rounded-sm px-1 form-tags"
            title="Etiquetas de la publicación"
            aria-label="Etiquetas de la publicación"
            disabled={isLoading}
          />
        </Form.Group>

        <Form.Group controlId="images">
          <Form.File
            ref={inputFiles}
            accept="image/*"
            name="images"
            onChange={handleOnChangeFile}
            disabled={isLoading}
            title="Selecciona las imagenes"
            aria-label="Selecciona las imagenes"
            required
            multiple
          />
        </Form.Group>
        <ErrorText
          isVisible={isError}
          text="Ocurrió un error, verifica tu conexión."
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Previsualización de la imágen"
            title="Esta imágen se subira al servidor"
          />
        )}

        <BtnLoader text="Subir" isLoading={isLoading} variant="success" block />
      </Form>
    </div>
  );
}

Upload.propTypes = {
  toggleOpen: PropTypes.func.isRequired,
};

export default Upload;
