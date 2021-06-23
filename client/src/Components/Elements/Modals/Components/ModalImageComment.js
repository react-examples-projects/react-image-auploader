import BtnLink from "../../../Elements/BtnLink";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { useState } from "react";

function ModalImageComment({ content, _id, user }) {
  const { user: userCurrent } = useCurrentUser();
  const [isVisibleComment, setVisibleComment] = useState(false);
  const isLargeComment = content.length > 200 && !isVisibleComment;
  const comment = isLargeComment
    ? content.substring(0, 200) + "... "
    : content + " ";
    
  return (
    <div key={_id} className="comment">
      <h6 className={user.isAdmin ? "text-admin" : undefined}>{user.name}</h6>
      <p className="m-0">
        {comment}
        {content.length > 200 && (
          <BtnLink
            text={isVisibleComment ? "Mostrar menos" : "Mostrar más"}
            onClick={() => setVisibleComment((c) => !c)}
          />
        )}
      </p>
      {userCurrent._id === user._id && (
        <div className="comment-options">
          <BtnLink text="Editar" />
          <BtnLink text="Eliminar" />
        </div>
      )}
    </div>
  );
}

export default ModalImageComment;
