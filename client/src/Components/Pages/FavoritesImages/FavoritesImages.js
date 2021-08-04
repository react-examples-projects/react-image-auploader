import "../../../Style/App.scss";
import useTitle from "../../Hooks/useTitle";
import ImageList from "../../Elements/ImageList/ImageList";
import Layout from "../../Elements/Layouts/Layout";
import useFavoritesImages from "../../Hooks/images/useFavoriteImages";

function FavoritesImages() {
  useTitle("Favoritas");
  const { data } = useFavoritesImages();
  console.log(data)
  return (
    <>
      <Layout>
        <h2 className="title mb-4">Imágenes favoritas</h2>
        <ImageList images={data} />
      </Layout>
    </>
  );
}

export default FavoritesImages;
