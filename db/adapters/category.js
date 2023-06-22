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
module.exports = { createCategory };
