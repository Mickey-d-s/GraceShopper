import { AuthContext } from "./auth/AuthProvider";
import { useState, useEffect, useContext } from "react";
import { fetchAllOrdersForUser } from "../api/profile";
import { Link } from "react-router-dom";

export default function Profile() {
  const [shoppingCarts, setShoppingCarts] = useState([]);
  const { user } = useContext(AuthContext);
  // NOT FINISHED

  useEffect(() => {
    async function fetchShoppingCarts() {
      try {
        const fetchedShoppingCarts = await fetchAllOrdersForUser();
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
          <div>{user.username}</div>
          <hr></hr>
          <div className="orderhistory">
            <h2> Order History</h2>
            <h3 className="historyProducts">Your Recent Purchased Items</h3>
            {shoppingCarts.map((shoppingCart) => (
              <div key={shoppingCart.shoppingcart_id} className="ShoppingCart">
                <h2>Order No. {shoppingCart.shoppingcart_id}</h2>
                {shoppingCart.products.map((item) => (
                  <div key={item.item_id}>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.qty}</p>
                    <p>Cost Per Item: ${item.price}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
