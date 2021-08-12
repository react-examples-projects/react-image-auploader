import "../../../Style/App.scss";
import useTitle from "../../Hooks/useTitle";
import ImageList from "../../Elements/ImageList/ImageList";
import Layout from "../../Elements/Layouts/Layout";
import useFavoriteImages from "../../Hooks/HooksStore/useFavoriteImage";

function FavoritesImages() {
  const { favoriteImages } = useFavoriteImages();
  useTitle("Favoritas");
  return (
    <>
      <Layout>
        <h2 className="title mb-4">Imágenes favoritas</h2>
        <ImageList images={favoriteImages} />
      </Layout>
    </>
  );
}

export default FavoritesImages;
