export async function createShoppingCart(status, user_id) {
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
