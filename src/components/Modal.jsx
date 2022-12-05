import "./Modal.css";
import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Modal = ({ setLoggedInUser, setOpenModal }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then(({ users }) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  const handleClick = (i) => {
    setLoggedInUser(users[i]);
    setOpenModal(false);
  };
  if (isLoading) return <Loading />;
  return (
    <div className="modal-container modal-content-wrapper">
      <div className="modal-backdrop ">
        <div className="modal">
          <div className="d-flex justify-content-end">
            <span className="close-span " onClick={() => setOpenModal(false)}>
              x
            </span>
          </div>
          <h1 className="text-center text-light modal-header">
            Select your user
          </h1>
          <div className="modal-users-wrapper ">
            {users.map(({ username, name, avatar_url }, index) => {
              return (
                <Link key={index} className="text-decoration">
                  <div
                    className="modal-users-container "
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

export default Modal;
