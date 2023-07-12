import { useContext, useState, useEffect } from "react";
import {
  createShoppingCart,
  completeOrder,
  cancelOrder,
} from "../api/shoppingcart";
import { getUserShoppingCart } from "../api/menu";
import { AuthContext } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const SHOPPING_CART_CREATED_KEY = "shoppingCartCreated";

export default function StartOrder({ setCartItemCount }) {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartCreated, setShoppingCartCreated] = useState(
    localStorage.getItem(SHOPPING_CART_CREATED_KEY) === "true"
  );

  let navigate = useNavigate();

  async function startShopping() {
    try {
      // Check if the user already has a shopping cart
      if (shoppingCart.length > 0) {
        console.log("User already has a shopping cart.");
        return;
      }
      // Create a new shopping cart if no cart exists
      const createdOrder = await createShoppingCart({
        status: "pending",
        user_id: user.user_id,
      });
      //if statement for guest user
      console.log("Created Cart in FE: ", createdOrder);
      setOrder(createdOrder);
      setShoppingCartCreated(true);
      localStorage.setItem(SHOPPING_CART_CREATED_KEY, "true");
      navigate("/Menu");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchShoppingCart = async () => {
      try {
        const result = await getUserShoppingCart();
        setShoppingCart(result.products);
        localStorage.setItem("cartItems", JSON.stringify(result.products));
      } catch (error) {
        console.error("Error fetching shopping cart:", error);
      }
    };
    fetchShoppingCart();
  }, []);

  //Delete function item from cart_items inside of shopping cart
  //Update function QTY of item inside of shopping cart

  const checkout = async () => {
    try {
      const completedCart = await completeOrder();
      console.log("Shopping cart completed:", completedCart);
      setShoppingCart([]);
      localStorage.removeItem(SHOPPING_CART_CREATED_KEY);
      localStorage.setItem("cartItems", "[]");
      localStorage.clear();
      //edits inventory qty by how much was ordered
      setCartItemCount(0);
    } catch (error) {
      console.error("Error completing shopping cart:", error);
    }
  };
  const totalPrice = shoppingCart.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  const handleEditQty = (itemId, newQty) => {
    const updatedCart = shoppingCart.map((item) => {
      if (item.item_id === itemId) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    setShoppingCart(updatedCart);
  };
  const deleteOrder = async () => {
    try {
      const canceledShoppingCart = await cancelOrder();
      console.log("Canceled shopping cart:", canceledShoppingCart);
      setShoppingCart([]);
      localStorage.removeItem(SHOPPING_CART_CREATED_KEY);
      localStorage.setItem("cartItems", "[]");
      localStorage.clear();
      setCartItemCount(0);
    } catch (error) {
      console.error("Error canceling shopping cart:", error);
    }
  };

  return (
    <div>
      <div id="orderButtons">
        {!shoppingCartCreated && (
          <button id="startShopping" onClick={() => startShopping()}>
            Start Order
          </button>
        )}
        {shoppingCartCreated && (
          <>
            <button onClick={() => checkout()}>Checkout</button>
            <button onClick={() => deleteOrder()}>Cancel Order</button>
          </>
        )}
      </div>
      <div className="cart">
        <h1> My Shopping Cart</h1>
        <h2>Total Price: $ {totalPrice}</h2>
        <br></br>
        {shoppingCart.length > 0 ? (
          <div>
            {shoppingCart.map((item) => (
              <div key={item.item_id}>
                <p>{item.name}</p>
                <p>Qty: {item.qty}</p>

                <button
                  onClick={() => handleEditQty(item.item_id, item.qty - 1)}
                >
                  {" "}
                  -
                </button>
                <button onClick={() => handleEditQty(item.item_id, 0)}>
                  Delete
                </button>
                <button
                  onClick={() => handleEditQty(item.item_id, item.qty + 1)}
                >
                  {" "}
                  +
                </button>
                <p>Cost Per Item: ${item.price}</p>
                <p>Subtotal: ${item.price * item.qty}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Your shopping cart is empty 🤕</p>
        )}
      </div>
    </div>
  );
}
