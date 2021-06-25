import { lazy, Suspense, memo } from "react";
import { withErrorBoundary } from "react-error-boundary";

import ImageLoader from "../../Loaders/ImageLoader";
import Loader from "../../Loaders/loader";
import ThereNotImages from "../../../Images/there_not_image.svg";
import useImagesGlobal from "../../Hooks/HooksStore/useImages";
import ImageListError from "../ErrorBoundaries/ImageListError";
const ImagePostLazy = lazy(() => import("../ImagePost/ImagePost"));

function ImageList() {
  console.log("ImageList Render();");
  const { data, isLoading, isError } = useImagesGlobal().images;
  
  if (isError) return <ImageListError />;
  if (isLoading) return <Loader />;
  if (!data.length) {
    return (
      <div className="there-dont-images">
        <img src={ThereNotImages} alt="There don't images right now :(" />
        <h2>Parece que ahora mismo no hay publicaciones, vuelve más tarde</h2>
      </div>
    );
  }

  return (
    <div className="massory">
      {data.map((img) => (
        <Suspense fallback={<ImageLoader />} key={img._id}>
          <ImagePostLazy {...img} />
        </Suspense>
      ))}
    </div>
  );
}

export default memo(
  withErrorBoundary(ImageList, { FallbackComponent: ImageListError })
);
