const categoriesRouter = require("express").Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} = require("../db/adapters/category");
const { authRequired } = require("./utils");

categoriesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { category_name } = req.body;
    const newCategory = await createCategory(category_name);
    res.send(newCategory);
  } catch (error) {
    next(error);
  }
});
