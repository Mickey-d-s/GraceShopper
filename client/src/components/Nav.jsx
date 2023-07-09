import { Link } from "react-router-dom";
import { logout } from "../api/userAuth";
import useAuth from "../components/hooks/useAuth";
import "../App.css";
import "../index.css";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Nav = () => {
  const { setLoggedIn, loggedIn, user, setUser } = useAuth();
  const navigate = useNavigate();
  console.log("loggedIn", loggedIn);

  const getCartItemCount = () => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      return parsedCartItems.length;
    }
    return 0;
  };

  const cartItemCount = getCartItemCount();

  async function handleLogout() {
    await logout();
    setLoggedIn(!loggedIn);
    navigate("/users/login");
  }

  return (
    <nav className="nav">
      <h3 className="Username">MICKEY D's</h3>
      <div className="Link">
        <Link to="/">Home</Link>
      </div>
      {user?.username != "Stranger" && (
        <>
          <div className="Link">
            <Link to="/Profile">Profile</Link>
          </div>
          <div className="Link">
            <Link to="/Menu">Menu</Link>
          </div>
          <div className="Link">
            <Link to="/shoppingcart">Shopping Cart</Link>
            <div className="cart">
              <i className="bi bi-cart3"></i>
              <div className="cartAmount">{cartItemCount}</div>
            </div>
          </div>
        </>
      )}
      {user?.adm != false && user?.username != "Stranger" && (
        <>
          <div className="Link">
            <Link to="/Dashboard">Admin-Dash</Link>
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
            <Link to="/Menu">Menu</Link>
          </div>
        </>
      )}
      {/* {user?.username != "Stranger" && user?.isAdmin === true && (
        <>
          <div className="Link">
            <Link to="/register">Register</Link>
          </div>
          <div className="Link">
            <Link to="/login">Login</Link>
          </div>
          <div className="Link">
            <Link to="/Profile">Profile</Link>
          </div>
          <div className="Link">
            <Link to="/Menu">Menu</Link>
          </div>
        </>
      )} */}
      <h3 className="Username">Hi, {user.username}</h3>
      <button className="navbar__logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
