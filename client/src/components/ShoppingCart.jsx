import { useContext, useState, useEffect } from "react";
import { createShoppingCart, fetchItemsFromCart } from "../api/shoppingcart";
import { getUserShoppingCart } from "../api/menu";
import { AuthContext } from "./auth/AuthProvider";
// import { useNavigate } from "react-router-dom";

export default function StartOrder() {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [started, setStarted] = useState(false);
  const [items, setItems] = useState([]);
  const [cart_id, setShoppingCartId] = useState(null);

  // let navigate = useNavigate();

  async function createShoppingCart() {
    try {
      const createdOrder = await createShoppingCart({
        status: "pending",
        user_id: user.user_id, // Access the user_id from the user object
      });
      console.log("Created Cart in FE: ", createdOrder);
      setOrder(createdOrder);
      setStarted(true);
      // navigate("/Menu");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchShoppingCartId = async () => {
      try {
        const result = await getUserShoppingCart();
        setShoppingCartId(result.shoppingcart_id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShoppingCartId();
  }, []);

  useEffect(() => {
    async function fetchAllItems() {
      try {
        const fetchedItems = await fetchItemsFromCart(cart_id);
        setItems(fetchedItems);
        console.log("FETCHED ITEMS IN CART:", fetchedItems);
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
          <button onClick={() => createShoppingCart()}>Start Order</button>
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
