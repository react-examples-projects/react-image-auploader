import PropTypes from "prop-types";
import ModalImageComment from "./ModalImageComment";
function ModalImageComments({ comments }) {
  if (!comments.length) {
    return (
      <h3 style={{ marginTop: "2rem" }}>
        Nadie a comentado, sé el primero en hacerlo
      </h3>
    );
  }

  return (
    <div>
      {comments.map((comment) => (
        <ModalImageComment {...comment} key={comment._id} />
      ))}
    </div>
  );
}

ModalImageComments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default ModalImageComments;
