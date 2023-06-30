import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import { createShoppingCart } from "../api/shoppingcart";
import AuthProvider from "./auth/AuthProvider";
import useAuth from "./hooks/useAuth";

export default function startOrder() {
  const [order, setOrder] = useState([]);
  const { user, setUser } = useAuth;
  const [status, setStatus] = useState("active");

  async function shoppingCart() {
    try {
      console.log("user", user);
      const order = await createShoppingCart(status, user.id);
      setOrder(order);
      setStatus(status);
    } catch (error) {
      console.log(error);
    }
  }
  shoppingCart();

  return (
    <div>
      <button onClick={() => shoppingCart()}>Create Shopping Cart</button>
    </div>
  );
}
