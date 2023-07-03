import useAuth from "../components/hooks/useAuth";
import { useState, useEffect } from "react";
import { fetchAllShoppingCarts } from "../api/shoppingcart";

export default function Profile() {
  const [ShoppingCarts, setShoppingCarts] = useState([]);
  const [user, setUser] = useState(useAuth());
  console.log("user:", user);

  useEffect(() => {
    async function fetchShoppingCarts() {
      try {
        const fetchedShoppingcarts = await fetchAllShoppingCarts();
        setShoppingCarts(fetchedShoppingcarts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchShoppingCarts();
  }, []);

  return (
    <>
      <div className="profilePage">
        <h1> Welcome to your Profile {user.username}</h1>
        <h2> order history</h2>
        <h2>Inventory</h2>
        {ShoppingCarts.map(() => (
          <div key={shoppingcarts.shoppingcart_id}>
            <p>Shopping Cart Id: {shoppingcarts.shoppingcart_id}</p>
            <p>Status: {shoppingcarts.status}</p>
            <p>User Id: {shoppingcarts.user_id}</p>
          </div>
        ))}
        <div className="orderhistory">place your order now!</div>
      </div>
    </>
  );
}
