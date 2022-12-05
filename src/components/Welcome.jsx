import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Welcome = ({ loggedInUser, setLoggedInUser }) => {
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
  };

  if (isLoading) return <Loading />;
  return (
    <main className="container content-wrapper">
      {loggedInUser ? (
        <h1 className="text-bold pt-2">
          Hi {loggedInUser.name.split(" ")[0]}. Select another user or{" "}
          <Link
            className="text-decoration color"
            to="/"
            onClick={() => {
              setLoggedInUser(null);
            }}
          >
            sign out...
          </Link>
        </h1>
      ) : (
        <h1 className="text-bold pt-2">Welcome to HD NEWS</h1>
      )}
      <h1 className="text-center text-light">Select your user</h1>

      <div className="users-wrapper ">
        {users.map(({ username, name, avatar_url }, index) => {
          return (
            <Link to="/articles" key={index} className="text-decoration">
              <div
                className="users-container "
                onClick={() => {
                  handleClick(index);
                }}
              >
                <img src={avatar_url} className="avatar-img" alt="avatar" />
                <h3>{name}</h3>
                <p>Username: {username}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {!loggedInUser ? (
        <Link to="/articles" className="text-center-links">
          <h3 className="mt-2 text-gray">
            Or continue as <b className="text-black">GUEST</b>
          </h3>
        </Link>
      ) : null}
    </main>
  );
};

export default Welcome;
