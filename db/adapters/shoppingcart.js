const { array } = require("prop-types");
const client = require("../client");

async function createShoppingCarts({ status, user_id }) {
  try {
    console.log(user_id);
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
            INSERT INTO shoppingcarts(status, user_id)
            VALUES($1,$2)
            RETURNING *;
            `,
      [status, user_id]
    );
    return shoppingCart;
  } catch (error) {
    throw error;
  }
}

// not sure if we need a full crud but will do so just in case
async function deleteshoppingcartbyuserid({ user_id, updateobj }) {
  try {
    //untested
    console.log(user_id);

    const {
      rows: [shoppingCart],
    } = await client.query(
      `
        Delete FROM shoppingcarts
        where id = $1 
        `,
      [user_id]
    );
  } catch (error) {
    throw error;
  }
}

async function updateshoppingcart({ user_id }) {
  try {
    //untested
    console.log(user_id);
    const setString = Object.keys(updateObj)

      .map((key, i) => {
        return `${key}=$${i + 1}`;
      })
      .join(", ");
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
      UPDATE shoppingcarts
      SET ${setString}
      WHERE id = ${user_id}
      returning *
    `,
      Object.values(updateObj)
    );
  } catch (error) {
    throw error;
  }
}
//this is more than likely broken, couldn't find anything on it.... asked pawan hopefully get a message back
async function getshoppingcartbyuserid({ user_id }) {
  try {
    const {
      rows: [shoppingCart],
    } = await client.query(
      `
      SELECT
      shoppingcarts.id as id,
      shoppingcarts.status as status,
      shoppingcarts.user_id as customer,
      CASE WHEN cart_itmes.shoppingcart_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'productid', cart_items.product_id,
          'count', cart_items.count
        )
      )
    `,
      [user_id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = { createShoppingCarts };

multidimsumarray = (1, 4, [4, 2], [2, [2, 3]], 3);

function sumofarray(array) {
  flatarray = array.flat(10);
  const accumilator = 0;
  const adder = (accumilator, toadd) => Math.max(accumilator, toadd);
  sumwithintial = flatarray.reduce(adder, flatarray);
}
