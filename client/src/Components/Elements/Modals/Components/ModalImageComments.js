import PropTypes from "prop-types";
import ModalImageComment from "./ModalImageComment";
function ModalImageComments({ comments, removeComment, editComment }) {
  if (!comments.length) {
    return (
      <h5 className="mt-3 text-center">
        Nadie a comentado, sé el primero en hacerlo
      </h5>
    );
  }

  return (
    <div>
      {comments.map((comment) => {
        return (
          <ModalImageComment
            {...{ ...comment, removeComment, editComment }}
            key={comment._id}
          />
        );
      })}
    </div>
  );
}

ModalImageComments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default ModalImageComments;
