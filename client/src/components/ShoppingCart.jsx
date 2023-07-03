import { useContext, useState } from "react";
import { createShoppingCart } from "../api/shoppingcart";
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
      setOrder(createdOrder);
      setStarted(true);
      navigate("/Menu");
      // Rest of the code
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {!started && <button onClick={() => shoppingCart()}>Start Order</button>}
      <button>Cancel Order</button>
    </div>
  );
}
