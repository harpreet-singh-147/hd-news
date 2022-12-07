import { useState } from "react";
import "./VotesErrorModal.css";

const mountedStyle = {
  animation: "inAnimation 670ms ease-in",
};
const unmountedStyle = {
  animation: "outAnimation 670ms ease-out",
  animationFillMode: "forwards",
};

const VotesErrorModal = ({ voteErrorModal, setVoteErrorModal }) => {
  const [passedModal, setPassedModal] = useState(voteErrorModal);

  return (
    <div
      className="vote-alert-modal-container"
      style={passedModal ? mountedStyle : unmountedStyle}
    >
      <div className="vote-alert-modal-backdrop ">
        <div className="vote-alert-modal">
          <div>
            <div className="vote-alert-modal-wrapper">
              <h1 className="text-center">Something went wrong</h1>
              <h2 className="text-center pt-1">Try again later...</h2>
              <div className="pt-2 text-center">
                <button
                  className="btn-dark all-articles-page-btn"
                  onClick={() => {
                    setPassedModal(!passedModal);
                    setTimeout(() => {
                      setVoteErrorModal(false);
                    }, 680);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotesErrorModal;
