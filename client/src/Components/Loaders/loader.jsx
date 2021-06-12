import BeatLoader from "react-spinners/BeatLoader";

function Loader() {
  return (
    <div className="loader-page">
      <BeatLoader color="#fff" loading={true} size={20} />
    </div>
  );
}

export default Loader;
