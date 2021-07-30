import "../../../Style/App.scss";
import useTitle from "../../Hooks/useTitle";
import ImageList from "../../Elements/ImageList/ImageList";
import Layout from "../../Elements/Layouts/Layout";
import useFavoritesImages from "../../Hooks/useFavoritesImages";

function FavoritesImages() {
  useTitle("Favoritas");
  const favoritesImages = useFavoritesImages();
  console.log(favoritesImages);

  return (
    <>
      <Layout>
        <ImageList images={favoritesImages} />
      </Layout>
    </>
  );
}

export default FavoritesImages;
