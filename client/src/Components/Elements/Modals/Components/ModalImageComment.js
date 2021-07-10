import useCurrentUser from "../../../Hooks/useCurrentUser";
import { deleteComment } from "../../../../Helpers/api";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { BiCaretRight, BiCaretLeft } from "react-icons/bi";

function ModalImageComment({ content, _id, removeComment, user }) {
  const { user: userCurrent } = useCurrentUser();
  const [isVisibleComment, setVisibleComment] = useState(false);
  const isLargeComment = content.length > 200 && !isVisibleComment;
  const comment = isLargeComment
    ? content.substring(0, 200) + "... "
    : content + " ";

  const _deleteComment = () => {
    // global context
    removeComment(_id);
    // api
    deleteComment(_id);
  };

  return (
    <div key={_id} className="comment">
      <h6 className={user.isAdmin ? "text-admin" : undefined}>{user.name}</h6>
      <p className="m-0">
        {comment}
        {content.length > 200 && (
          <Button
            size="sm"
            variant="link"
            className="ml-1 text-secondary"
            onClick={() => setVisibleComment((c) => !c)}
          >
            {isVisibleComment ? (
              <span>
                <BiCaretLeft />
                Mostrar menos
              </span>
            ) : (
              <span className="text-light">
                <BiCaretRight className="mr-1" />
                Mostrar más
              </span>
            )}
          </Button>
        )}
      </p>
      {userCurrent._id === user._id && (
        <div className="comment-options">
          <Button size="sm" variant="link" className="text-secondary">
            Editar
          </Button>
          <Button
            size="sm"
            variant="link"
            className="text-secondary"
            onClick={_deleteComment}
          >
            Eliminar
          </Button>
        </div>
      )}
    </div>
  );
}

export default ModalImageComment;
