import useComments from "../../Hooks/Comments/useComments";
import ModalImageComments from "./Components/ModalImageComments";
import BtnLoader from "../../Elements/BtnLoader";
import ErrorText from "../../Elements/ErrorText";
import useLazyloadImage from "../../Hooks/useLazyloadImage";
import placeholder from "../../../Images/image_post_loading.gif";
import { toFormData } from "../../../Helpers/utils";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Form, Badge, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import useImageDelete from "../../Hooks/useImageDelete";
import useImages from "../../Hooks/HooksStore/useImages";

function ModalImage({ _id, src, tags, title, commentsImage, user: userPost }) {
  const [validated, setValidated] = useState(false);
  const { comments, addComment, createCommentImage, ...imagesProps } =
    useComments(commentsImage);
  const deleteImage = useImageDelete();
  const { removeImage } = useImages();
  const srcLazy = useLazyloadImage({ src, placeholder });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) return setValidated(true);
    setValidated(false);
    const fd = toFormData(e.target, {
      image_id: _id,
    });
    const comment = await createCommentImage.mutateAsync(fd);
    addComment(comment, _id);
    e.target.reset();
  };

  const removeComment = (commentId) => {
    return imagesProps.removeComment(_id, commentId);
  };

  const editComment = (commentId, commentContent) => {
    return imagesProps.editComment({ imageId: _id, commentId, commentContent });
  };

  const _removeImage = async () => {
    await deleteImage.mutateAsync(_id);
    removeImage(_id);
  };

  return (
    <>
      <h3 className="title" style={{ maxWidth: "92%" }}>
        {title}
      </h3>
      <img src={srcLazy} className="modal-img" alt="Preview" />
      <div className="tags">
        {tags.map((tag, i) => {
          return (
            <Badge variant="dark" className="mr-1 font-weight-light" key={i}>
              {tag}
            </Badge>
          );
        })}
      </div>
      <div className="d-flex align-items-center justify-content-between mt-1">
        <small className="d-block text-muted">
          Publicado por
          <Link
            to={`/perfil/${userPost._id}`}
            className="ml-1 text-reset font-weight-bold"
          >
            {userPost.name}
          </Link>
        </small>
        <Dropdown>
          <Dropdown.Toggle
            className="p-0 justify-content-end dropdown-image-modal-toggle"
            drop="start"
            variant="link"
            size="lg"
          >
            <BiDotsVerticalRounded />
          </Dropdown.Toggle>

          <Dropdown.Menu
            className="border-0"
            style={{ backgroundColor: "#0d0d0d" }}
          >
            <Dropdown.Item
              as={BtnLoader}
              variant="link"
              isLoading={deleteImage.isLoading}
              className="text-white dropdown-modal-image-item"
              onClick={_removeImage}
            >
              Eliminar
            </Dropdown.Item>
            <Dropdown.Item className="text-white dropdown-modal-image-item">
              Editar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
