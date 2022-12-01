import { Link } from "react-router-dom";

const Error = ({ error }) => {
  return (
    <>
      {" "}
      {error ? (
        <div>
          <h1 className="text-center">{error.msg}</h1>
          <h1 className="text-center">Status: {error.status}</h1>
          <p className="text-center">
            <Link to="/">Back to Homepage</Link>
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-center">Page not found</h1>
          <p className="text-center">
            <Link to="/">Back to Homepage</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Error;
