const client = require("../client");

async function createInventories({ product_id, quantity }) {
  try {
    const {
      rows: [inventory],
    } = await client.query(
      `
            INSERT INTO inventories(product_id, quantity)
            VALUES($1, $2)
            RETURNING *;
            `,
      [product_id, quantity]
    );
    return inventory;
  } catch (error) {
    throw error;
  }
}

async function getInventoryById(id) {
  const {
    rows: [inventory],
  } = await client.query(
    `SELECT * FROM inventories WHERE inventory_id=$1;
  `[id]
  );
  console.log("getInventoriesById CHECK", inventory);
  return inventory;
}

async function getAllInventoryById() {
  const {
    rows: [inventory],
  } = await client.query(`
  SELECT * 
  FROM inventories
  `);
  return rows;
  console.log("getAllInventoryById CHECK", inventory);
}

function updateInventory({ inventory_id, product_id, quantity }) {
  const {
    rows: [inventory],
  } = client.query(
    `
  UPDATE inventories SET inventory_id = $1
    where product_id=$2 and quantity = $3;
    `,
    [inventory_id, product_id, quantity]
  );
  console.log("updateInventory CHECK", inventory);
  return inventory;
}

async function deleteInventory(id) {
  const {
    rows: [inventory],
  } = await client.query(
    `DELETE from inventories WHERE inventory_id=$1
  `,
    [id]
  );
  return inventory;
}
module.exports = {
  createInventories,
  getInventoryById,
  getAllInventoryById,
  updateInventory,
  deleteInventory,
};
