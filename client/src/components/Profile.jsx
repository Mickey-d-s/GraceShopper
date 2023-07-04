import useAuth from "../components/hooks/useAuth";
import { useState, useEffect } from "react";
import { fetchAllShoppingCarts } from "../api/profile";

export default function Profile() {
  const [shoppingCarts, setShoppingCarts] = useState([]);
  const [user] = useState(useAuth());

  // NOT FINISHED
  // get all shopping carts related to user_id
  // AND list all of the cart items related to each specific shoppingcart_id
  // in order of groups
  useEffect(() => {
    async function fetchShoppingCarts() {
      try {
        const fetchedShoppingCarts = await fetchAllShoppingCarts();
        setShoppingCarts(fetchedShoppingCarts);
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
        <h2> Order History</h2>
        <div className="orderhistory">place your order now!</div>
      </div>
    </>
  );
}
