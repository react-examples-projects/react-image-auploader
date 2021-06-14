import BtnLink from "../../../Elements/BtnLink";
import useCurrentUser from "../../../Hooks/useCurrentUser";

function ModalImageComment({ content, _id, user }) {
  const { user: userCurrent } = useCurrentUser();
  return (
    <div key={_id} className="comment">
      <h4 className={user.isAdmin ? "text-admin" : undefined}>{user.name}</h4>
      <p>{content}</p>
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
