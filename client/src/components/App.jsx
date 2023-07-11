import { useState } from "react";
import Nav from "../components/Nav";
import Menu from "./Menu";
import Registerform from "../components/auth/RegisterForm";
import LoginForm from "../components/auth/LoginForm";
import HealthPage from "../components/HealthPage";
import Profile from "../components/Profile";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./home";
import Footer from "./Footer";
import ShoppingCart from "../components/ShoppingCart";
import { Dashboard } from "./Dashboard/dashboard";
import Inventory from "./Inventory";
import Users from "./Users";

const getCartItemCount = () => {
  const cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    const parsedCartItems = JSON.parse(cartItems);
    return parsedCartItems.length;
  }
  return 1;
};

function App() {
  const [cartItemCount, setCartItemCount] = useState(getCartItemCount());

  return (
    <div>
      <Nav cartItemCount={cartItemCount} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registerform />} />
        <Route path="/Profile" element={<Profile />} />
        <Route
          path="/Menu"
          element={<Menu setCartItemCount={setCartItemCount} />}
        />
        <Route path="Dashboard" element={<Dashboard />}>
          <Route path="inventory" element={<Inventory />}></Route>
          <Route path="users" element={<Users />}></Route>
        </Route>
        <Route path="/shoppingcart" element={<ShoppingCart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
