import useAuth from "../components/hooks/useAuth";
import { useState, useEffect } from "react";
import { fetchAllOrdersForUser } from "../api/profile";
import { Link } from "react-router-dom";

export default function Profile() {
  const [shoppingCarts, setShoppingCarts] = useState([]);
  const [user] = useState(useAuth());
  console.log("user", user);
  // NOT FINISHED
  // get all shopping carts related to user_id
  // AND list all of the cart items related to each specific shoppingcart_id
  // in order of groups
  useEffect(() => {
    async function fetchShoppingCarts() {
      try {
        const fetchedShoppingCarts = await fetchAllOrdersForUser(user.user_id);
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
        <h1 className="userHeader">Welcome, {user.user.username}!</h1>
        <div className="userInfo">
          <u>USER INFO</u>
          <div>{user.user.username}</div>
          <hr></hr>
          <div className="orderhistory">
            <h2> Order History</h2>
            <h3 className="historyProducts">Your Recent Purchased Items</h3>
            <ul className="history"></ul>
            {/* {shoppingCarts.map((item) => (
              <div key={item.item_id}>
                <p>{item.name}</p>
                <p>Qty: {item.qty}</p> */}
            {/* add on click to edit qty that
               deletes if qty is changed to 0*/}
            {/* should update if qty is >1 */}
            {/* <button>Edit Qty</button>
                <p>Cost Per Item: {item.price}</p>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}
