import "../../../Style/App.scss";
import Loader from "../../Loaders/loader";
import useImages from "../../Hooks/useImages";
import { useState, useEffect } from "react";
import Navbar from "../../Elements/Navbar";
import useTitle from "../../Hooks/useTitle";
import ImageList from "../../Elements/ImageList/ImageList";

function App() {
  const { images, isLoading, isError, refetch } = useImages();
  const [imagesArray, setImagesArray] = useState(() => images);
  useTitle("Explorar nuevas imágenes");
  useEffect(() => {
    setImagesArray(images);
  }, [images]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Navbar setImagesArray={setImagesArray} />
      <ImageList {...{ imagesArray, isError }} />
    </>
  );
}

export default App;
