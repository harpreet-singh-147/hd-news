import { Link, useLocation } from "react-router-dom";
const Nav = ({ loggedInUser, setLoggedInUser }) => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">NC News</Link>
        </div>
        <ul className="nav">
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          {loggedInUser ? (
            <>
              <li>
                <Link to="" style={{ pointerEvents: "none" }}>
                  Hello {loggedInUser.name.split(" ")[0]}
                </Link>
              </li>
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
            </>
          ) : !loggedInUser && location.pathname !== "/" ? (
            <li>
              <Link to="/">Sign In</Link>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
