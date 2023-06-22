import { Link } from "react-router-dom";
import { logout } from "../api/userAuth";
import useAuth from "../components/hooks/useAuth";

const Nav = () => {
  const { setLoggedIn, loggedIn } = useAuth();
  const { token, user } = useAuth();
  console.log("token in app.jsx:", token);
  console.log("User in app.jsx:", user);

  async function handleLogout() {
    await logout();
    setLoggedIn(!loggedIn);
  }

  return (
    <nav className="navbar">
      <h3 className="navbar__username">Hi, {user.username}</h3>
      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user?.username != "Stranger" && (
          <>
            <li>
              <Link to="/users/profile">Profile</Link>
            </li>
          </>
        )}
        {(user?.username == "Stranger" || user?.username == "Stranger") && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
      <button className="navbar__logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
