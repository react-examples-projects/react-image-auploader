import "../../../Style/App.scss";
import Navbar from "../../Elements/Navbar";
import useTitle from "../../Hooks/useTitle";
import ImageList from "../../Elements/ImageList/ImageList";
import ImagesProvider from "../../Context/Images/ImagesProvider";

function App() {
  useTitle("Explorar nuevas imágenes");
  return (
    <>
      <ImagesProvider>
        <Navbar />
        <ImageList />
      </ImagesProvider>
    </>
  );
}

export default App;
