import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../api/products";

export default function allProducts() {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h2>Menu List</h2>
      {products.map((product) => (
        <div key={product.product_id}>
          {product.product_name}
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
        </div>
      ))}
    </div>
  );
}
