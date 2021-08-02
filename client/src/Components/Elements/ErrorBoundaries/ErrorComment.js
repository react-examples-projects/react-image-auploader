import ErrorText from "../ErrorText";

export default function ErrorComment() {
  return (
    <ErrorText
      isVisible={true}
      text="Error al mostrar este comentario"
      style={{
        padding: "1rem",
        backgroundColor: "#0d0d0d",
        borderRadius: "4px",
      }}
    />
  );
}
