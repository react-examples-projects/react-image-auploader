import "../../../Style/App.scss";
import useTitle from "../../Hooks/useTitle";
import ImageList from "../../Elements/ImageList/ImageList";
import Layout from "../../Elements/Layouts/Layout";
import useFavoritesImages from "../../Hooks/useFavoritesImages";

function FavoritesImages() {
  useTitle("Favoritas");
  const favoritesImages = useFavoritesImages();

  return (
    <>
      <Layout>
        <h2 className="title mb-4">Imágenes favoritas</h2>
        <ImageList images={favoritesImages} />
      </Layout>
    </>
  );
}

export default FavoritesImages;
