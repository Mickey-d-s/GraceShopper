import { useContext, useState, useEffect } from "react";
import { createShoppingCart, completeOrder } from "../api/shoppingcart";
import { getUserShoppingCart } from "../api/menu";
import { AuthContext } from "./auth/AuthProvider";
// import { useNavigate } from "react-router-dom";

export default function StartOrder() {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  // let navigate = useNavigate();

  async function startShopping() {
    try {
      // Does the user have a cart already??????
      // If the user does not have a cart:
      const createdOrder = await createShoppingCart({
        status: "pending",
        user_id: user.user_id, // Access the user_id from the user object
      });
      console.log("Created Cart in FE: ", createdOrder);
      setOrder(createdOrder);
      // navigate("/Menu");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchShoppingCart = async () => {
      try {
        const result = await getUserShoppingCart();
        setShoppingCart(result.products);
      } catch (error) {
        console.error("Error fetching shopping cart:", error);
      }
    };
    fetchShoppingCart();
  }, []);

  const checkout = async () => {
    try {
      const completedCart = await completeOrder();
      console.log("Shopping cart completed:", completedCart);
      setShoppingCart([]);
    } catch (error) {
      console.error("Error completing shopping cart:", error);
      // Handle the error
    }
  };

  return (
    <div>
      <div id="orderButtons">
        <button onClick={() => startShopping()}>Start Order</button>
        <button onClick={() => checkout()}>Checkout</button>
        <button>Cancel Order</button>
      </div>
      {shoppingCart.length > 0 ? (
        <div>
          {shoppingCart.map((item) => (
            <div key={item.item_id}>
              <p>{item.name}</p>
              <p>Qty: {item.qty}</p>
              <p>Cost Per Item: {item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your shopping cart is empty.</p>
      )}
    </div>
  );
}
