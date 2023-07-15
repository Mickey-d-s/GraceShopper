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
async function updateInventoryTotal(quantity, product_id) {
  try {
    await client.query(
      `
      UPDATE inventories 
      SET quantitiy = quantity - $1
      WHERE product_id = $2;
      `,
      [quantity, product_id]
    );
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
async function updateInventories(product_id, quantity) {
  try {
    const {
      rows: [updatedInventories],
    } = await client.query(
      `
      UPDATE inventories
      SET quantity = $2
      WHERE inventory_id = (SELECT inventory_id FROM products WHERE product_id = $1);
    `,
      [product_id, quantity]
    );
    return updatedInventories;
  } catch (error) {
    throw error;
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
  updateInventories,
  updateInventory,
  deleteInventory,
  updateInventoryTotal,
};
