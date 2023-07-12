import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import {
  deleteinventory,
  fetchAllInventories,
  createInventory,
} from "../api/inventory";
import { Outlet } from "react-router-dom";

export default function allInventories() {
  const [inventories, setInventories] = useState([]);
  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchInventories() {
      try {
        const fetchedInventories = await fetchAllInventories();
        setInventories(fetchedInventories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchInventories();
  }, []);
  async function handledelete(e, inventory_id) {
    try {
      const deleteinventoryfromDB = await deleteinventory(inventory_id);
    } catch (error) {
      throw error;
    }
  }
  async function handleAdd(e) {
    try {
      const addedinventoryfromDB = await createInventory(
        product_name,
        price,
        description,
        category
      );
    } catch (error) {
      throw error;
    }
  }
  return (
    <div>
      <h2>Inventory</h2>
      <form onSubmit={handleAdd}>
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
      {inventories.map((inventory) => (
        <div key={inventory.inventory_id} className="inventories">
          <p>Product: {inventory.product.product_name}</p>
          <p>Quantiy: {inventory.quantity}</p>
          <button
            value={inventory.inventory_id}
            onClick={(e) => {
              handledelete(e, inventory.inventory_id);
            }}
          >
            delete {inventory.product.product_name}?
          </button>
        </div>
      ))}
      <Outlet />
    </div>
  );
}
