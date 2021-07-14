import useComments from "../../Hooks/useComments";
import ModalImageComments from "./Components/ModalImageComments";
import BtnLoader from "../../Elements/BtnLoader";
import ErrorText from "../../Elements/ErrorText";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useLazyloadImage from "../../Hooks/useLazyloadImage";
import placeholder from "../../../Images/image_post_loading.gif";
import { toFormData } from "../../../Helpers/utils";

import { Form, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";

function ModalImage({ _id, src, tags, title, commentsImage, user: userPost }) {
  const [validated, setValidated] = useState(false);
  const { comments, addComment, createCommentImage, ...imagesProps } =
    useComments(commentsImage);
  const { user } = useCurrentUser();
  const srcLazy = useLazyloadImage({ src, placeholder });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) return setValidated(true);
    setValidated(false);
    const fd = toFormData(e.target, {
      image_id: _id,
      name: user.name,
      user: user._id,
    });
    const comment = await createCommentImage.mutateAsync(fd);
    addComment(comment, _id);
    e.target.reset();
  };

  const removeComment = (commentId) => {
    imagesProps.removeComment(_id, commentId);
  };

  const editComment = (commentId, commentContent) => {
    imagesProps.editComment({ imageId: _id, commentId, commentContent });
  };

  return (
    <>
      <h3 className="title" style={{ maxWidth: "92%" }}>
        {title}
      </h3>
      <img src={srcLazy} className="modal-img" alt="Preview" />
      <div className="tags">
        {tags.map((tag) => {
          return (
            <Badge variant="dark" className="mr-1 font-weight-light">
              {tag}
            </Badge>
          );
        })}
      </div>
      <div className="d-flex">
        <small className="d-block text-muted">
          Publicado por
          <Link
            to={`/perfil/${userPost._id}`}
            className="ml-1 text-reset font-weight-bold"
          >
            {userPost.name}
          </Link>
        </small>
      </div>
      <hr />
      <h5 className="mb-3">
        Deja un comentario
        {comments.length > 0 && <span> {`(${comments.length})`} </span>}
      </h5>
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
      <ModalImageComments {...{ comments, removeComment, editComment }} />
    </>
  );
}

ModalImage.propTypes = {
  _id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  commentsImage: PropTypes.array.isRequired,
};

export default ModalImage;
