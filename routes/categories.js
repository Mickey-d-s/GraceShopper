const categoriesRouter = require("express").Router();
const { sign } = require("jsonwebtoken");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
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

categoriesRouter.get("/", async (req, res, next) => {
  try {
    const AllCategories = await getAllCategories();
    res.send(AllCategories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get("/:id", async (req, res, next) => {
  try {
    const SingleCategory = await getCategoryById(req.params.id);
    console.log("Get category by id", SingleCategory);
    res.send(SingleCategory);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.patch("/:update", authRequired, async (req, res, next) => {
  try {
    const { category_name } = req.body;
    const UpdatedCategory = await updateCategory(
      req.params.update,
      category_name
    );
    res.send(UpdatedCategory);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.delete(
  "/:category_id",
  authRequired,
  async (req, res, next) => {
    try {
      const category_id = req.params.category_id;
      const deletedCategory = await deleteCategory(category_id);
      res.send(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = categoriesRouter;
