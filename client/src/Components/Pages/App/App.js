import "../../../Style/App.scss";
import useTitle from "../../Hooks/useTitle";
import ImageList from "../../Elements/ImageList/ImageList";
import ImagesProvider from "../../Context/Images/ImagesProvider";
import Layout from "../../Elements/Layouts/Layout";

function App() {
  useTitle("Explorar nuevas imágenes");
  return (
    <>
      <ImagesProvider>
        <Layout>
          <ImageList />
        </Layout>
      </ImagesProvider>
    </>
  );
}

export default App;
