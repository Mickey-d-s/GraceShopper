const client = require("../client");

async function createInventories({ quantity }) {
  try {
    const {
      rows: [inventory],
    } = await client.query(
      `
            INSERT INTO inventories(quantity)
            VALUES($1)
            RETURNING *;
            `,
      [quantity]
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
    `
  SELECT * 
  FROM inventories
  WHERE inventory_id=$1;
  `,
    [id]
  );
  console.log("getInventoriesById CHECK", inventory);
  return inventory;
}

async function getAllInventory() {
  try {
    const { rows } = await client.query(`
          SELECT * FROM inventories;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateInventory({ inventory_id, product_id, quantity }) {
  const {
    rows: [inventory],
  } = await client.query(
    `
    UPDATE inventories
    SET inventory_id = $1
    WHERE product_id = $2 AND quantity = $3;
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
    `DELETE from inventories WHERE inventory_id = $1
  `,
    [id]
  );
  return { success: true, message: "iventory deleted" };
}
module.exports = {
  createInventories,
  getInventoryById,
  getAllInventory,
  updateInventory,
  deleteInventory,
};
