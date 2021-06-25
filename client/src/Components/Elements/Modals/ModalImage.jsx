import useComments from "../../Hooks/useComments";
import ModalImageComments from "./Components/ModalImageComments";
import BtnLoader from "../../Elements/BtnLoader";
import ErrorText from "../../Elements/ErrorText";
import useCurrentUser from "../../Hooks/useCurrentUser";

import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { useState } from "react";

function ModalImage({ _id, src, commentsImage }) {
  const [validated, setValidated] = useState(false);
  const { comments, addComment, createCommentImage } =
    useComments(commentsImage);
  const { user } = useCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) return setValidated(true);
    setValidated(false);

    const fd = new FormData(e.target);
    fd.append("image_id", _id);
    fd.append("name", user.name);
    fd.append("user", user._id);
    const data = await createCommentImage.mutateAsync(fd);
    addComment(_id, data);
    e.target.reset();
  };

  return (
    <>
      <img src={src} className="modal-img" alt="Preview" />
      <hr />
      <h5 className="mb-3">Deja un comentario</h5>
      <Form
        autoComplete="off"
        validated={validated}
        noValidate
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="content">
          <Form.Control
            as="textarea"
            name="content"
            rows="4"
            size="sm"
            placeholder="¡Di lo que opinas!"
            disabled={createCommentImage.isLoading}
            required
          />
        </Form.Group>

        <ErrorText
          text="Ocurrió un error al comentar"
          isVisible={createCommentImage.isError}
        />
        <BtnLoader
          text="Comentar"
          isLoading={createCommentImage.isLoading}
          variant="success"
          block
        />
      </Form>
      <ModalImageComments comments={comments} />
    </>
  );
}

ModalImage.propTypes = {
  _id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  commentsImage: PropTypes.array.isRequired,
};

export default ModalImage;
