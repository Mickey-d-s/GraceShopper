import { useContext, useState, useEffect } from "react";
import {
  createShoppingCart,
  fetchItemsFromCart,
  fetchProductById,
} from "../api/shoppingcart";
import { getUserShoppingCart } from "../api/menu";
import { AuthContext } from "./auth/AuthProvider";
// import { useNavigate } from "react-router-dom";

export default function StartOrder() {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [started, setStarted] = useState(false);
  const [items, setItems] = useState([]);
  const [cart_id, setShoppingCartId] = useState(null);
  const [history, setHistory] = useState([]);

  // let navigate = useNavigate();

  async function startShopping() {
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
  async function orderHistory() {
    try {
      const userHistory = await getAllOrdersByUserId({
        user_id: user.user_id,
        status: "pending",
      });
      console.log("created order histroy", userHistory);
      setHistory(userHistory);
    } catch (error) {
      console.log("Error fetching orders it NO WORK", error);
    }
  }
  orderHistory();

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
    async function fetchAllCartItems() {
      try {
        if (cart_id) {
          const fetchedItems = await fetchItemsFromCart(cart_id);
          const itemsWithProductNames = await Promise.all(
            fetchedItems.map(async (item) => {
              const product = await fetchProductById(item.product_id);
              return {
                ...item,
                product_name: product.product_name,
                price: product.price,
              };
            })
          );
          setItems(itemsWithProductNames); // Update the items state
          console.log("FETCHED ITEMS IN CART:", itemsWithProductNames);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllCartItems();
  }, [cart_id]);

  return (
    <div>
      <div id="orderButtons">
        {!started && (
          <button onClick={() => startShopping()}>Start Order</button>
        )}
        <button>Cancel Order</button>
      </div>
      {items.map((item) => (
        <div key={item.item_id}>
          <p>{item.product_name}</p>
          <p>Quantity: {item.count}</p>
          <p>Cost: {item.price}</p>
        </div>
      ))}
    </div>
  );
}
