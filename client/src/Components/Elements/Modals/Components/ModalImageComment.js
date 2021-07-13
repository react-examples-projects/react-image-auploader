import useCurrentUser from "../../../Hooks/useCurrentUser";
import {
  deleteComment,
  editComment as _editComment,
} from "../../../../Helpers/api";
import useToggle from "../../../Hooks/useToggle";

import { Button, FormControl, Image } from "react-bootstrap";
import { useState } from "react";
import { BiCaretRight, BiCaretLeft } from "react-icons/bi";

function ModalImageComment({ content, _id, removeComment, editComment, user }) {
  console.log(user);
  const { user: userCurrent } = useCurrentUser();
  const [isEditingMode, toggleEditingMode] = useToggle();
  const [commentContentEdited, setCommentContentEdite] = useState(content);
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

  const _editComement = () => {
    // global context
    editComment(_id, commentContentEdited);

    // api
    _editComment(_id, commentContentEdited);
    toggleEditingMode();
  };

  return (
    <div key={_id} className="d-flex comment align-items-start">
      <Image
        src={user.perfil_photo}
        alt={`${user.name} avatar`}
        title={`${user.name} avatar`}
        style={{ objectFit: "cover" }}
        className="d-block mr-2"
        width="35"
        height="35"
        roundedCircle
      />
      <div className="flex-shrink-1 w-100">
        <h6 className={user.isAdmin ? "text-admin" : undefined}>{user.name}</h6>
        {isEditingMode ? (
          <FormControl
            defaultValue={commentContentEdited}
            onChange={(e) => setCommentContentEdite(e.target.value)}
            size="sm"
            required
          />
        ) : (
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
        )}

        {userCurrent._id === user._id && (
          <div className="comment-options">
            {isEditingMode && (
              <Button
                size="sm"
                variant="link"
                className="text-success"
                onClick={_editComement}
              >
                Guardar
              </Button>
            )}
            <Button
              size="sm"
              variant="link"
              className="text-secondary"
              onClick={toggleEditingMode}
            >
              {isEditingMode ? "Cancelar" : "Editar"}
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
    </div>
  );
}

export default ModalImageComment;
