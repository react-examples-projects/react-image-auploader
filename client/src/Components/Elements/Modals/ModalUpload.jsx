import css from "../../Pages/Style.module.scss";
import ErrorText from "../ErrorText";
import useUploadImage from "../../Hooks/useUploadImage";
import useImages from "../../Hooks/HooksStore/useImages";
import useCurrentUser from "../../Hooks/useCurrentUser";
import BtnLoader from "../BtnLoader";

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
  const { user } = useCurrentUser();

  async function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    data.append("user", user._id);
    for (let tag of tags) data.append("tags[]", tag);

    if (!form.checkValidity()) return setValidated(true);
    setValidated(false);

    const newImage = await upload(data);
    addImage(newImage);
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
          <Form.Control
            type="text"
            name="title"
            placeholder="Título de la obra"
            disabled={isLoading}
            required
          />
        </Form.Group>
        <Form.Group controlId="tags">
          <TagsInput
            value={tags}
            onChange={handleOnChangeTag}
            className="bg-transparent border rounded-sm px-1 form-tags"
          />
        </Form.Group>

        <Form.Group controlId="images">
          <Form.File
            ref={inputFiles}
            accept="image/*"
            name="images"
            onChange={handleOnChangeFile}
            disabled={isLoading}
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
            alt="It will upload to server"
            title="It will upload to server"
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
