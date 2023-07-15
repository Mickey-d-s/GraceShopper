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
// //updates product by PUT request
// export async function updateInventoryQty(inventory_id, quantity) {
//   try {
//     const response = await fetch(`/api/inventories/${inventory_id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity }),
//     });
//     const updatedTotalInvQty = await response.json();
//     console.log("updated inventory:", updatedTotalInvQty);
//     return updatedTotalInvQty;
//   } catch (error) {
//     console.error("Error updating Inventory Quantity:", error);
//   }
// }

export async function deleteProduct(product_id, inventory_id) {
  console.log("product_id & inventory_id:", product_id, inventory_id);
  try {
    const response = await fetch(`/api/products/${product_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inventory_id }),
    });
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
  // Create inventory row
  await fetch(`/api/inventories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inventory_id,
    }),
  });
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

export async function updateInventories(p_id) {
  const { product_id, quantity } = p_id;
  console.log("product_id object:", p_id);
  console.log("product_id:", product_id);
  console.log("quantity:", quantity);
  try {
    const response = await fetch(`/api/inventories/${product_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error("failed to update inventory quantity");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// export async function updateProducts(
//   product_id,
//   product_name,
//   price,
//   description,
//   category
// ) {
//   try {
//     const response = await fetch(`/api/products/:${product_id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ product_name, price, description, category }),
//     });
//     if (!response.ok) {
//       throw new Error("failed to update product quantity");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
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
