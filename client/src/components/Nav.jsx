import { Link } from "react-router-dom";
import { logout } from "../api/userAuth";
import useAuth from "../components/hooks/useAuth";
import "../App.css";
import "../index.css";

const Nav = () => {
  const { setLoggedIn, loggedIn, setUser, user } = useAuth();

  console.log("User in app.jsx:", user);

  async function handleLogout() {
    await logout();
    setLoggedIn(!loggedIn);
  }

  return (
    <nav className="navbar">
      <h3 className="navbar__username">Hi, {user.username}</h3>
      <div className="Link">
        <Link to="/">Home</Link>
      </div>
      {user?.username != "Stranger" && (
        <>
          <div className="Link">
            <Link to="/users/profile">Profile</Link>
          </div>
        </>
      )}
      {user?.username === "Stranger" && (
        <>
          <div className="Link">
            <Link to="/register">Register</Link>
          </div>
          <div className="Link">
            <Link to="/login">Login</Link>
          </div>
          <div className="Link">
            <Link to="/profile">Profile</Link>
          </div>
        </>
      )}
      <button className="navbar__logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
