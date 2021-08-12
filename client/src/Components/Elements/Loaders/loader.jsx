import MoonLoader from "react-spinners/MoonLoader";

function Loader() {
  return (
    <div className="loader-page">
      <MoonLoader color="#fff" loading={true} size={40} />
    </div>
  );
}

export default Loader;
