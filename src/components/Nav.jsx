import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import UserLoginModal from "./UserLoginModal";
import "./Nav.css";

const Nav = ({ loggedInUser, setLoggedInUser }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();

  return (
    <>
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
                    onClick={() => {
                      setNavOpen(false);
                      setLoggedInUser(null);
                    }}
                  >
                    Sign out
                  </Link>
                </>
              ) : !loggedInUser && location.pathname !== "/" ? (
                <Link
                  onClick={() => {
                    setNavOpen(false);
                    setOpenModal(true);
                  }}
                >
                  Sign In
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
      {openModal ? (
        <UserLoginModal
          setLoggedInUser={setLoggedInUser}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      ) : null}
    </>
  );
};

export default Nav;
