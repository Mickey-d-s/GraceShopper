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
