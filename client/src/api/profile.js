export async function fetchAllShoppingCarts(shoppingcart_id) {
  try {
    const response = await fetch(`/api/shoppingcart/:${shoppingcart_id}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
