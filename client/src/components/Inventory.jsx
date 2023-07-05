import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import { fetchAllInventories } from "../api/inventory";
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
  return (
    <div>
      <h2>Inventory</h2>
      {inventories.map((inventory) => (
        <div key={inventory.inventory_id}>
          <p>Product: {inventory.product.product_name}</p>
          <p>Quantiy: {inventory.quantity}</p>
        </div>
      ))}
      <Outlet />
    </div>
  );
}
