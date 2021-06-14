import { lazy, Suspense } from "react";
import ImageLoader from "../../Loaders/ImageLoader";
import ThereNotImages from "../../../Images/there_not_image.svg";
const ImagePostLazy = lazy(() => import("../ImagePost/ImagePost"));

export default function ImageList({ imagesArray, isError }) {
  if (isError) return <p>A ocurred error</p>;
  if (!imagesArray.length) {
    return (
      <div className="there-dont-images">
        <img src={ThereNotImages} alt="There don't images right now :(" />
        <h2>Parece que ahora mismo no hay publicaciones, vuelve más tarde</h2>
      </div>
    );
  }
  return (
    <div className="massory">
      {imagesArray.map((img, index) => (
        <Suspense fallback={<ImageLoader />} key={index}>
          <ImagePostLazy {...img} />
        </Suspense>
      ))}
    </div>
  );
}
