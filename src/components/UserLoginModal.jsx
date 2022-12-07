import "./UserLoginModal.css";
import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

const mountedStyle = {
  animation: "inAnimation 678ms ease-in",
};
const unmountedStyle = {
  animation: "outAnimation 678ms ease-out",
  animationFillMode: "forwards",
};

const UserLoginModal = ({ setLoggedInUser, openModal, setOpenModal }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passedModal, setPassedModal] = useState(openModal);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then(({ users }) => {
        setUsers(users);
        setIsLoading(false);
        setError(null);
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          setError({ msg, status });
          setIsLoading(false);
        }
      );
  }, []);

  const handleClick = (i) => {
    setLoggedInUser(users[i]);
    setPassedModal(!passedModal);
    setTimeout(() => {
      setOpenModal(false);
    }, 680);
  };

  if (error) return <Error error={error} />;
  if (isLoading) return <Loading />;
  return (
    <div
      className="modal-container modal-content-wrapper"
      style={passedModal ? mountedStyle : unmountedStyle}
    >
      <div className="modal-backdrop">
        <div className="modal">
          <div className="d-flex justify-content-end">
            <span
              className="close-span "
              onClick={() => {
                setPassedModal(!passedModal);
                setTimeout(() => {
                  setOpenModal(false);
                }, 680);
              }}
            >
              x
            </span>
          </div>
          <h1 className="text-center text-light modal-header">
            Select your user
          </h1>
          <div className="modal-users-wrapper">
            {users.map(({ username, name, avatar_url }, index) => {
              return (
                <Link key={index} className="text-decoration">
                  <div
                    className="modal-users-container"
                    onClick={() => {
                      handleClick(index);
                    }}
                  >
                    <img
                      src={avatar_url}
                      className="modal-avatar-img"
                      alt="avatar"
                    />
                    <h3 className="modal-avatar-name">{name}</h3>
                    <p className="modal-avatar-username">@{username}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginModal;
