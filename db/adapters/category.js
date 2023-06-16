const { client } = require("../client");

async function createCategory({ category_name }) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
            INSERT INTO category(category_name)
            VALUES($1)
            ON CONFLICT (category_name) DO NOTHING
            RETURNING *;
            `,
      [category_name]
    );
    return category;
  } catch (error) {
    throw error;
  }
}
