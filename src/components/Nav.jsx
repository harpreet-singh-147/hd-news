import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Nav.css";

const Nav = ({ loggedInUser, setLoggedInUser }) => {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav">
          <input type="checkbox" id="nav-check" checked={navOpen} readOnly />
          <div className="nav-header">
            <div className="nav-title">
              <Link onClick={() => setNavOpen(false)} to="/">
                HD News
              </Link>
            </div>
          </div>
          <div
            onClick={() => setNavOpen(!navOpen)}
            className={navOpen ? "nav-btn open" : "nav-btn "}
          >
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div className="nav-links">
            {!loggedInUser ? (
              <Link to="/articles" onClick={() => setNavOpen(false)}>
                Articles
              </Link>
            ) : null}
            {loggedInUser ? (
              <>
                <Link
                  style={{
                    pointerEvents: "none",
                  }}
                >
                  Hello {loggedInUser.name.split(" ")[0]}
                </Link>
                <Link to="/articles" onClick={() => setNavOpen(false)}>
                  Articles
                </Link>

                <Link
                  to="/"
                  onClick={() => {
                    setNavOpen(false);
                    setLoggedInUser(null);
                  }}
                >
                  Sign out
                </Link>
              </>
            ) : !loggedInUser && location.pathname !== "/" ? (
              <Link to="/" onClick={() => setNavOpen(false)}>
                Sign In
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
