import { memo } from "react";
import { withErrorBoundary } from "react-error-boundary";

import Loader from "../../Elements/Loaders/loader";
import ThereNotImages from "../../../Images/there_not_image.svg";
import useImagesGlobal from "../../Hooks/HooksStore/useImages";
import ImageListError from "../ErrorBoundaries/ImageListError";
import useImageFound from "../../Hooks/images/useImageFound";
import ImagePost from "../ImagePost/ImagePost";

function ImageList({ images: imagesToShow }) {
  const { data, foundSearches, isLoading, isError } = useImagesGlobal().images;
  const images = useImageFound(foundSearches, data, imagesToShow);

  if (isError) return <ImageListError />;
  if (isLoading) return <Loader />;
  if (!data.length) {
    return (
      <div className="there-dont-images">
        <img src={ThereNotImages} alt="No hay publicaciones para mostrar :(" />
        <h2>No hay publicaciones para mostrar</h2>
      </div>
    );
  }

  return (
    <section className="massory">
      {images.map((img) => (
        <ImagePost key={img._id} {...img} />
      ))}
    </section>
  );
}

export default memo(
  withErrorBoundary(ImageList, { FallbackComponent: ImageListError })
);
