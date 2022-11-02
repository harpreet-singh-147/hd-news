import { useState, useEffect } from "react";
import { fetchUsers } from "../api";

const Welcome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(({ users }) => {
      setUsers(users);
    });
  }, []);
  return (
    <div className="container">
      <h2 className="text-center">Select your user</h2>
      <div className="users-wrapper">
        {users.map(({ username, name, avatar_url }, index) => {
          return (
            <div className="users-container">
              <img src={avatar_url} className="avatar-img" />
              <h3>{name}</h3>
              <p>Username: {username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Welcome;
