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

export async function deleteProducts(id) {
  try {
    const response = await fetch(`/api/products/${id}`, { method: "delete" });
    console.log(response);
    const results = response.json;
    return results;
  } catch (error) {
    throw error;
  }
}

export async function createProduct(
  product_name,
  price,
  description,
  inventory_id,
  category
) {
  try {
    console.log(product_name, price, description, inventory_id, category);
    const response = await fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name,
        price,
        description,
        inventory_id,
        category,
      }),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    throw error;
  }
}
// export async function createInventories(quantity) {
//   try {
//     const response = await fetch(`/api/inventories`, {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         quantity,
//       }),
//     });
//     const results = response.json;
//     return resuls;
//   } catch (error) {
//     throw error;
//   }
// }
