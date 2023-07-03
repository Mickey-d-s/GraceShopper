export async function createShoppingCart({ status, user_id }) {
  try {
    const response = await fetch(`/api/shoppingcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
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

export async function fetchAllShoppingCarts() {
  try {
    const response = await fetch("/api/shoppingcart");
    const shoppingcarts = await response.json();

    // Fetch product details for each inventory
    const shoppingcartsPromises = shoppingcarts.map(async (shoppingcart) => {
      const userResponse = await fetch(
        `/api/shoppingcart/${shoppingcart.user_id}`
      );
      const user = await userResponse.json();
      shoppingcart.user = user;
      return shoppingcart.user;
    });

    const fetchedShoppingcart = await Promise.all(shoppingcartsPromises);
    console.log("fetched Shoppingcart", fetchedShoppingcart);
    return fetchedShoppingcart;
  } catch (error) {
    console.error(error);
  }
}
