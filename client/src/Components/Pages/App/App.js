import "../../../Style/App.scss";
import useTitle from "../../Hooks/useTitle";
import ImageList from "../../Elements/ImageList/ImageList";
import Layout from "../../Elements/Layouts/Layout";

function App() {
  useTitle("Explorar");
  return (
    <>
      <Layout>
        <ImageList />
      </Layout>
    </>
  );
}

export default App;
