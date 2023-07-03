export async function fetchAllProducts() {
  try {
    const response = await fetch("/api/products");
    const result = await response.json();
    console.log("result in fetch all Products", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getShoppingCartByUserId(user_id) {
  try {
    const response = await fetch(`/api/shoppingcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// export async function getShoppingCartByUserId(user_id) {
//   try {
//     const response = await fetch(`/api/shoppingcart`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // Process the response here
//   } catch (error) {
//     throw error;
//   }
// }

export async function addItemToCart(shoppingcart_id, product_id, count) {
  try {
    const response = await fetch("/api/cart_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shoppingcart_id, product_id, count),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    const cart_item = await response.json();
    return cart_item;
  } catch (error) {
    throw error;
  }
}
