import useCurrentUser from "../../../Hooks/useCurrentUser";
import useToggle from "../../../Hooks/useToggle";
import BtnLoader from "../../BtnLoader";
import ErrorText from "../../ErrorText";

import { Button, FormControl, Image } from "react-bootstrap";
import { useState } from "react";
import { BiCaretRight, BiCaretLeft } from "react-icons/bi";
import { useMutation } from "react-query";

function ModalImageComment({ content, _id, removeComment, editComment, user }) {
  const { user: userCurrent } = useCurrentUser();
  const [isEditingMode, toggleEditingMode] = useToggle();
  const [commentContentEdited, setCommentContentEdite] = useState(content);
  const [isVisibleComment, setVisibleComment] = useState(false);
  const deleteCommentMutation = useMutation(() => removeComment(_id));
  const editCommentMutation = useMutation(() =>
    editComment(_id, commentContentEdited)
  );

  const isLargeComment = content.length > 200 && !isVisibleComment;
  const comment = isLargeComment
    ? content.substring(0, 200) + "... "
    : content + " ";

  const _editComment = async () => {
    await editCommentMutation.mutateAsync();
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
          <>
            <div className="comment-options">
              {isEditingMode && (
                <BtnLoader
                  size="sm"
                  variant="link"
                  onClick={_editComment}
                  isLoading={editCommentMutation.isLoading}
                >
                  <span className="text-success">Guardar</span>
                </BtnLoader>
              )}

              <Button
                size="sm"
                variant="link"
                className="text-secondary"
                onClick={toggleEditingMode}
              >
                {isEditingMode ? "Cancelar" : "Editar"}
              </Button>
              <BtnLoader
                size="sm"
                variant="link"
                onClick={() => deleteCommentMutation.mutateAsync()}
                isLoading={deleteCommentMutation.isLoading}
              >
                <span className="text-secondary">Eliminar</span>
              </BtnLoader>
            </div>
            <ErrorText
              className="mb-0"
              isVisible={deleteCommentMutation.isError}
              text="Ocurrió un error al eliminar"
            />
            <ErrorText
              isVisible={editCommentMutation.isError}
              text="Ocurrió un error al editar"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ModalImageComment;
