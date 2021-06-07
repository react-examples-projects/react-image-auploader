import "../../../Style/App.scss";
import ImageLoader from "../../Loaders/ImageLoader";
import Loader from "../../Loaders/loader";
import useImages from "../../Hooks/useImages";
import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "../../Elements/Navbar";

const ImageLazy = lazy(() => import("../../Image/Image"));

function App() {
  const { images, isLoading, isError } = useImages();
  const [imagesArray, setImagesArray] = useState(() => images);
  useEffect(() => {
    setImagesArray(images);
  }, [images]);

  if (isLoading) return <Loader />;

  return (
    <>
      {isError && <p>A ocurred error</p>}
      <Navbar setImagesArray={setImagesArray} />
      <div className="massory">
        {imagesArray.map((img, index) => (
          <Suspense fallback={<ImageLoader />} key={index}>
            <ImageLazy {...img} />
          </Suspense>
        ))}
      </div>
    </>
  );
}

export default App;
