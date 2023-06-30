import { useContext, useState } from "react";
import { createShoppingCart } from "../api/shoppingcart";
import { AuthContext } from "./auth/AuthProvider";

export default function StartOrder() {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);

  async function shoppingCart() {
    try {
      const createdOrder = await createShoppingCart({
        status: "pending",
        user_id: user.user_id, // Access the user_id from the user object
      });
      setOrder(createdOrder);
      // Rest of the code
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button onClick={() => shoppingCart()}>Create Shopping Cart</button>
    </div>
  );
}
