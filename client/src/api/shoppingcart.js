// export async function createShoppingCart(cartData) {
//   try {
//     const response = await fetch("/shoppingcart", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cartData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create shopping cart");
//     }

//     const createdCart = await response.json();
//     return createdCart;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

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
