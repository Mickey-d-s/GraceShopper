import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import { deleteinventory, fetchAllInventories } from "../api/inventory";
import { Outlet } from "react-router-dom";

export default function allInventories() {
  const [inventories, setInventories] = useState([]);

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
  return (
    <div>
      <h2>Inventory</h2>
      {inventories.map((inventory) => (
        <div key={inventory.inventory_id}>
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
