import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Welcome = ({ setLoggedInUser }) => {
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
    <div className="container">
      <h1 className="text-center text-light">Select your user</h1>
      <Link to="/articles" className="text-center-links">
        <h2>Or continue as guest</h2>
      </Link>
      <div className="users-wrapper">
        {users.map(({ username, name, avatar_url }, index) => {
          return (
            <Link to="/articles" key={index}>
              <div
                className="users-container"
                onClick={() => {
                  handleClick(index);
                }}
              >
                <img src={avatar_url} className="avatar-img" />
                <h3>{name}</h3>
                <p>Username: {username}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Welcome;
