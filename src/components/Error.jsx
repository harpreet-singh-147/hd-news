import { useState } from "react";
import "./Error.css";
import { useNavigate } from "react-router-dom";

const mountedStyle = {
  animation: "inAnimation 670ms ease-in",
};
const unmountedStyle = {
  animation: "outAnimation 670ms ease-out",
  animationFillMode: "forwards",
};

const Error = ({ error, errorModal, setErrorModal }) => {
  const [passedModal, setPassedModal] = useState(!errorModal);
  const navigate = useNavigate();
  return (
    <div
      className="error-modal-container"
      style={passedModal ? mountedStyle : unmountedStyle}
    >
      {error ? (
        <div className="error-modal-backdrop ">
          <div className="error-modal">
            <div>
              <div className="error-modal-wrapper">
                <div className="error-modal-text-center">
                  <h1 className="error-modal-text">{error.msg}</h1>
                  <h1 className="error-modal-text error-modal-text-center pb-1">
                    Status: {error.status}
                  </h1>
                </div>
                <div className="error-modal-text error-modal-text-center">
                  <button
                    className="btn-dark error-modal-btn"
                    onClick={() => {
                      setPassedModal(!passedModal);
                      setTimeout(() => {
                        navigate(-1);
                        setErrorModal(false);
                      }, 680);
                    }}
                  >
                    Go back
                  </button>
                  <button
                    className="btn-dark error-modal-btn"
                    onClick={() => {
                      setPassedModal(!passedModal);
                      setTimeout(() => {
                        navigate("/");
                        setErrorModal(false);
                      }, 680);
                    }}
                  >
                    Go home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="error-modal-backdrop ">
          <div className="error-modal">
            <div>
              <div className="error-modal-wrapper">
                <div className="pb-1">
                  <h1 className="error-modal-text-center error-modal-text">
                    Page not found
                  </h1>
                </div>
                <div className="text-center">
                  <button
                    className="btn-dark error-modal-btn"
                    onClick={() => {
                      setPassedModal(!passedModal);
                      setTimeout(() => {
                        navigate(-1);
                        setErrorModal(false);
                      }, 680);
                    }}
                  >
                    Go back
                  </button>
                  <button
                    className="btn-dark error-modal-btn"
                    onClick={() => {
                      setPassedModal(!passedModal);
                      setTimeout(() => {
                        navigate("/");
                        setErrorModal(false);
                      }, 680);
                    }}
                  >
                    Go home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Error;
