export async function fetchAllInventories() {
  try {
    const response = await fetch("/api/inventories");
    const inventories = await response.json();

    // Fetch product details for each inventory
    const inventoryPromises = inventories.map(async (inventory) => {
      const productResponse = await fetch(
        `/api/products/${inventory.product_id}`
      );
      const product = await productResponse.json();
      inventory.product = product;
      return inventory;
    });

    const fetchedInventories = await Promise.all(inventoryPromises);
    console.log("fetched inventories", fetchedInventories);
    return fetchedInventories;
  } catch (error) {
    console.error(error);
  }
}
   //updates product by PUT request 
   export async function updateInventoryQty(inventory_id, quantity){
    try {
      const response = await fetch(`/api/inventories/${inventory_id}`,{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity})
        });
      const updatedTotalInvQty = await response.json();
      console.log("updated inventory:", updatedTotalInvQty);
      return updatedTotalInvQty;
    } catch (error){
      console.error('Error updating Inventory Quantity:', error);
    }
  }
      

export async function deleteinventory(id) {
  try {
    const response = await fetch(`/api/products/${id}`, { method: "delete" });
    console.log(response);
    const results = response.json;
    return results;
  } catch (error) {
    throw error;
  }
}
