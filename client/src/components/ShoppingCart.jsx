import { useContext, useState, useEffect } from "react";
import { createShoppingCart } from "../api/shoppingcart";
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
    // user the user.id (from useAuth) to fetch you shoppingcart where status is pending
    // Make sure that the shopping cart from the db includes all products
    // const result = await getUserShoppingCart();
    // the its a matter of keeping the shoppingcart (with products) in state
    // and map over it
  }, []);

  return (
    <div>
      <div id="orderButtons">
        <button onClick={() => startShopping()}>Start Order</button>

        <button>Cancel Order</button>
      </div>
      {shoppingCart.length > 0 ? (
        <div>
          {shoppingCart.map((item) => (
            <div key={item.product_id}>
              <p>{item.name}</p>
              <p>Quantity: {item.qty}</p>
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
