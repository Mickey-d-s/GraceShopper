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

export async function completeOrder(user_id) {
  try {
    const response = await fetch(`/api/shoppingcart/completed`, {
      method: "PATCH",
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

export async function fetchAllOrdersForUser(user_id) {
  try {
    const response = await fetch("/api/allOrdersForUser/${user_id}");
    const result = await response.json();
    console.log("fetch all orders for a specific user", result);
    return result;
  } catch (error) {
    console.error(`Error fetching data from server ${error}`);
  }
}



