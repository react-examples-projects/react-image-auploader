import useCurrentUser from "../../../Hooks/useCurrentUser";
import BtnLink from "../../../Elements/BtnLink";
export default function ModalImageComments({ comments }) {
  const { user: userCurrent } = useCurrentUser();
  if (!comments.length) {
    return (
      <h3 style={{ marginTop: "2rem" }}>
        Nadie a comentado, sé el primero en hacerlo
      </h3>
    );
  }

  return (
    <div>
      {comments.map(({ content, _id, user }) => {
        return (
          <div key={_id} className="comment">
            <h4 className={user.isAdmin ? "text-admin" : undefined}>
              {user.name}
            </h4>
            <p>{content}</p>
            {userCurrent._id === user._id && (
              <div className="comment-options">
                <BtnLink text="Editar" />
                <BtnLink text="Eliminar" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
