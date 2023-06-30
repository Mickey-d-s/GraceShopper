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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
