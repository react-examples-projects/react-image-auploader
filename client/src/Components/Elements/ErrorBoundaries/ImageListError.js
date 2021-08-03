import ErrorImages from "../../../Images/undraw_bug_fixing_oc7a.svg";
import Image from "react-bootstrap/Image";
import ErrorContent from "./ErrorContent";

export default function ImageListError() {
  return (
    <div className="mx-auto w-100 px-3" style={{ maxWidth: "500px" }}>
      <Image src={ErrorImages} fluid />
      <h3 className="font-weight-bold mt-4">
        Ocurrió un error al mostrar las imágenes
      </h3>
      <ErrorContent isTextCenter={false} />
    </div>
  );
}
