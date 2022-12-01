import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
  return (
    <div className="container ">
      <div className="loading-spinner">
        <ClipLoader color="black" size={70} aria-label="Loading Spinner" />
      </div>
    </div>
  );
}

export default Loading;
