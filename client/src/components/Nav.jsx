import { Link } from "react-router-dom";
import { logout } from "../api/userAuth";
import useAuth from "../components/hooks/useAuth";
import "../App.css";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { setLoggedIn, loggedIn, user, setUser } = useAuth();
  const navigate = useNavigate();
  console.log("loggedIn", loggedIn);

  async function handleLogout() {
    await logout();
    setLoggedIn(!loggedIn);
    navigate("/users/login");
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
          <div className="Link">
            <Link to="/products">Menu</Link>
          </div>
          <div className="Link">
            <Link to="/inventories">Inventory</Link>
          </div>
          <div className="Link">
            <Link to="/shoppingcart">Shopping Cart</Link>
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
          <div className="Link">
            <Link to="/products">Menu</Link>
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
