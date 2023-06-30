import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import { createShoppingCart } from "../api/shoppingcart";

export default function startOrder() {
  const [order, setOrder] = useState([]);

  async function shoppingCart() {
    try {
      const order = await createShoppingCart();
      setOrder(order);
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
