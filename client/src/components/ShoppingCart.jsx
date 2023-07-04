import { useContext, useState, useEffect } from "react";
import { createShoppingCart, fetchItemsFromCart } from "../api/shoppingcart";
import { AuthContext } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function StartOrder() {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [started, setStarted] = useState(false);
  let navigate = useNavigate();

  async function shoppingCart() {
    try {
      const createdOrder = await createShoppingCart({
        status: "pending",
        user_id: user.user_id, // Access the user_id from the user object
      });
      console.log("Created Cart in FE: ", createdOrder);
      setOrder(createdOrder);
      setStarted(true);
      navigate("/Menu");
    } catch (error) {
      console.log(error);
    }
  }
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchAllItems() {
      try {
        const fetchedItems = await fetchItemsFromCart(shoppingcart_id);
        setItems(fetchedItems);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllItems();
  }, []);

  return (
    <div>
      <div id="orderButtons">
        {!started && (
          <button onClick={() => shoppingCart()}>Start Order</button>
        )}
        <button>Cancel Order</button>
      </div>
      {/* {items.map((item) => (
        <div key={item.shoppingcart_id}>
          <p>{item.product_id}</p>
        </div>
      ))} */}
    </div>
  );
}
