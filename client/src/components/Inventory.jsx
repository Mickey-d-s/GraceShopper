import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import {
  deleteProducts,
  fetchAllInventories,
  createProduct,
} from "../api/inventory";
import { fetchAllProducts } from "../api/menu";
import { Outlet } from "react-router-dom";

export default function allInventories() {
  const [inventories, setInventories] = useState([]);
  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchInventories() {
      try {
        const fetchedInventories = await fetchAllInventories();
        setInventories(fetchedInventories);
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchInventories();
  }, []);
  async function handledelete(e, inventory_id) {
    try {
      const deleteproductsfromDB = await deleteProducts(inventory_id);
    } catch (error) {
      throw error;
    }
  }
  async function handleAdd(e) {
    try {
      const addedinventoryfromDB = await createProduct(
        product_name,
        price,
        description,
        inventory_id,
        category
      );
      console.log("AddedinventoryfromDB:", addedinventoryfromDB);
      return addedinventoryfromDB;
    } catch (error) {
      throw error;
    }
  }
  return (
    <div>
      <h2>Inventory</h2>
      <form
        onSubmit={(e) =>
          handleAdd(e, product_name, price, description, inventory_id, category)
        }
        className="addProduct"
      >
        <label> creating new product</label>
        <input
          type="text"
          id="product_name"
          placeholder="product name"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          id="price"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          id="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          id="category"
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {products.map((product) => {
        const productInventories = inventories.filter(
          (inventory) => inventory.product_id === product.product_id
        );
        const totalQuantity = productInventories.reduce(
          (sum, inventory) => sum + inventory.quantity,
          0
        );
        return (
          <div key={product.product_id} className="inventories">
            <p>Product: {product.product_name}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {totalQuantity}</p>
            {/* <button
              value={inventory.inventory_id}
              onClick={(e) => {
                handledelete(e, inventory.inventory_id);
              }}
            >
              delete {inventory.product.product_name}?
            </button> */}
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}
