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

async function updateInventoryQuantity(inventory_id, quantity) {
  try {
    await client.query(
      `
      UPDATE inventories
      SET quantity = $2
      WHERE inventory_id = $1
      RETURNING *
    `,
      [inventory_id, quantity]
    );

    console.log("Inventory quantity updated successfully!");
  } catch (error) {
    console.log("Error updating Inventory quantity:", error);
  }
}

async function updateInventory(inventory_id, updateObj) {
  console.log("whithin adapter", inventory_id, updateObj);
  const setString = Object.keys(updateObj)
    .map((key, i) => {
      return `${key}=$${i + 1}`;
    })
    .join(", ");
  const {
    rows: [inventory],
  } = await client.query(
    `
    UPDATE inventories
    SET ${setString}
    WHERE product_id = ${inventory_id}
    `,
    Object.values(updateObj)
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
  updateInventoryQuantity,
  updateInventory,
  deleteInventory,
};
