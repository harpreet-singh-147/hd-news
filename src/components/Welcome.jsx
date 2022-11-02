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
      <div>
        {users.map(({ username, name, avatar_url }) => (
          <div>
            <img src={avatar_url} />
            <h3>{name}</h3>
            <p>{username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
