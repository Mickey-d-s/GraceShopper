import useAuth from "../components/hooks/useAuth";
import { useState, useEffect } from "react";
import { fetchAllShoppingCarts } from "../api/profile";
import { Link } from "react-router-dom";

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
        <h1 className="userHeader">Welcome, {user.username}!</h1>
        <div className="userInfo">
          <u>USER INFO</u>
          <br></br>
          <Link to={`/Nav/orderhistory/${user.username}`}>Order History</Link>
          <br></br>
          to={`/Nav/WHATEVER WE WANT TO ADD/${user.username}`}
          <div className="orderhistory">
            <h2> Order History</h2>
            <h3 className="historyProducts">Your Recent Purchased Items</h3>
            <ul className="history"></ul>
            {/* map through array and display product name with price */}
          </div>
        </div>
      </div>
    </>
  );
}