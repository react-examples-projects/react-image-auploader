import useComments from "../../Hooks/useComments";
import ModalImageComments from "./Components/ModalImageComments";
import Btn from "../../Elements/Btn";
import ErrorText from "../../Elements/ErrorText";
import useCurrentUser from "../../Hooks/useCurrentUser";

function ModalImage({ _id, src, comments, addComment }) {
  const { createCommentImage } = useComments();
  const { user } = useCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("image_id", _id);
    fd.append("name", user.name);
    fd.append("user", user._id);
    const data = await createCommentImage.mutateAsync(fd);
    addComment(data);
    e.target.reset();
  };

  return (
    <>
      <img src={src} className="modal-img" alt="Preview" />
      <hr />
      <h3>Deja un comentario</h3>
      <form onSubmit={handleSubmit}>
        <div className="group">
          <textarea
            name="content"
            rows="4"
            placeholder="¡Di lo que opinas!"
            disabled={createCommentImage.isLoading}
            required
          />
        </div>

        <ErrorText
          text="Ocurrió un error al comentar"
          isVisible={createCommentImage.isError}
        />

        <Btn
          text={createCommentImage.isLoading ? "Comentado..." : "Comentar"}
          disabled={createCommentImage.isLoading}
        />
      </form>
      <ModalImageComments comments={comments} />
    </>
  );
}

export default ModalImage;
