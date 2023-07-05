import { useState, useEffect } from "react";
import {
  fetchAllProducts,
  addItemToCart,
  getUserShoppingCart,
} from "../api/menu";

export default function allProducts() {
  const [products, setProducts] = useState([]);
  const [cart_id, setShoppingCartId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

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

  const addToCart = async (shoppingcart_id, product_id, count) => {
    // Ensure shoppingcart_id is defined before adding to cart
    if (shoppingcart_id) {
      try {
        const cartItem = await addItemToCart({
          shoppingcart_id,
          product_id,
          count,
        });
        return cartItem;
      } catch (error) {
        console.log("Failed to add item to cart:", error);
      }
    }
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div>
      <h2>Menu</h2>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category}>
          <h1>{category}</h1>
          {products.map((product) => (
            <div key={product.product_id}>
              <h3>{product.product_name}</h3>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
              <button onClick={() => addToCart(cart_id, product.product_id, 1)}>
                Add to Cart
              </button>{" "}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
