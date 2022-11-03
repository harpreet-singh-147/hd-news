import { Link } from "react-router-dom";

const Nav = ({ loggedInUser, setLoggedInUser }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">NC News</Link>
        </div>
        <ul className="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          {loggedInUser ? (
            <li>
              <h3 className="nav">Hello {loggedInUser.username}</h3>
            </li>
          ) : null}
          {loggedInUser ? (
            <li>
              <Link
                to="/"
                onClick={() => {
                  setLoggedInUser(null);
                }}
              >
                Sign out
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
