const client = require("../client");

async function createCategoryThrough({ category_id, product_id }) {
  try {
    const {
      rows: [categoryThrough],
    } = await client.query(
      `
            INSERT INTO categoryThroughs(category_id, product_id)
            VALUES($1,$2)
            RETURNING *;
            `,
      [category_id, product_id]
    );
    return categoryThrough;
  } catch (error) {
    throw error;
  }
}
module.exports = { createCategoryThrough };
