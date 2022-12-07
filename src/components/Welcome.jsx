import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

const Welcome = ({ loggedInUser, setLoggedInUser }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
  };
  if (error) return <Error error={error} />;
  if (isLoading) return <Loading />;
  return (
    <main className="container content-wrapper">
      {loggedInUser ? (
        <h1 className="text-bold pt-2 header-main-welcome">
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
        <h1 className="text-bold pt-2 header-main-welcome">
          Welcome to HD NEWS
        </h1>
      )}
      <h1 className="text-center text-light header">Select your user</h1>

      <div className="users-wrapper">
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
                <h3 className="avatar-name">{name}</h3>
                <p className="avatar-username">@{username}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {!loggedInUser ? (
        <Link to="/articles" className="text-center-links">
          <h3 className="mt-2 pb-2 welcome-guest-txt">
            Continue as{" "}
            <b className="text-login-color welcome-guest-txt">guest</b>
          </h3>
        </Link>
      ) : null}
    </main>
  );
};

export default Welcome;
