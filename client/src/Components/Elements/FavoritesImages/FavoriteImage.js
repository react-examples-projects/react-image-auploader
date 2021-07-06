import { Image } from "react-bootstrap";

export default function FavoriteImage({ url_image, title }) {
  return (
    <div className="position-relative mb-1">
      <Image src={url_image} className="w-100" fluid rounded />
      <p
        className="mb-0 position-absolute p-1"
        style={{ zIndex: "1", bottom: "0", left: "0" }}
      >
        <small>{title}</small>
      </p>
    </div>
  );
}
