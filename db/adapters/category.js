const client = require("../client");

async function createCategory({ categoryname }) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
            INSERT INTO categories(category_name)
            VALUES($1)
            ON CONFLICT (category_name) DO NOTHING
            RETURNING *;
            `,
      [categoryname]
    );
    return category;
  } catch (error) {
    throw error;
  }
}
async function getAllCategories() {
  try {
    const { rows } = await client.query(`
          SELECT * FROM categories;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCategoryById(category_id) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
    SELECT * FROM categories
    WHERE category_id = $1;
    `,
      [category_id]
    );
    return category;
  } catch (error) {
    throw error;
  }
}

async function updateCategory(category_id, category_name) {
  try {
    const {
      rows: [updatedCategory],
    } = await client.query(
      `
    UPDATE categories
    SET category_name = $2
    WHERE category_id = $1
    RETURNING *;
    `,
      [category_id, category_name]
    );
    return updatedCategory;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
};
