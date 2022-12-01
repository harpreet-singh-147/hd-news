import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
const Nav = ({ loggedInUser, setLoggedInUser }) => {
  const location = useLocation();
  return (
    // <nav className="navbar">
    //   <div className="container">
    //     <div className="logo">
    //       <Link to="/">NC News</Link>
    //     </div>
    //     <ul className="nav">
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/articles">Articles</Link>
    //       </li>
    //       {loggedInUser ? (
    //         <>
    //           <li>
    //             <h3 className="nav">Hello {loggedInUser.username}</h3>
    //           </li>
    //           <li>
    //             <Link
    //               to="/"
    //               onClick={() => {
    //                 setLoggedInUser(null);
    //               }}
    //             >
    //               Sign out
    //             </Link>
    //           </li>
    //         </>
    //       ) : !loggedInUser && location.pathname !== "/" ? (
    //         <li>
    //           <Link to="/">Sign In</Link>
    //         </li>
    //       ) : null}
    //     </ul>
    //   </div>
    // </nav>
    <nav className="navbar">
      <div className="container">
        <div class="nav">
          <input type="checkbox" id="nav-check" />
          <div class="nav-header">
            <div class="nav-title">
              <Link className="logo-header" to="/">
                HD News
              </Link>
            </div>
          </div>
          <div class="nav-btn">
            <label for="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div class="nav-links">
            <Link to="/articles">Articles</Link>
            {loggedInUser ? (
              <>
                <a>Hello {loggedInUser.name.split(" ")[0]}</a>
                <Link
                  to="/"
                  onClick={() => {
                    setLoggedInUser(null);
                  }}
                >
                  Sign out
                </Link>
              </>
            ) : !loggedInUser && location.pathname !== "/" ? (
              <Link to="/">Sign In</Link>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
