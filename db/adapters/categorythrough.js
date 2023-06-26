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

async function deleteCategoryThrough(product_id, category_id) {
  await client.query(
    `DELETE from categorythroughs
          WHERE product_id =$1 && category_id=$2
          `,
    [product_id, category_id]
  );
  return;
}
module.exports = { createCategoryThrough, deleteCategoryThrough };
