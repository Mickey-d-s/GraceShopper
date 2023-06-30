import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import { fetchAllInventories} from "../api/inventory";

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
    
    fetchInventories();;
    }, []})
  return (
    <div>
      <h2>Inventory</h2>
            <div key={inventories.inventory_id}>
              <p>Product id: ${inventories.product_id}</p>
              <p>Quantiy: {inventories.Quantity}</p>
            </div>
        </div>
  );
}

