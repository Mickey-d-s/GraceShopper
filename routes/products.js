const productsRouter = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../db/adapters/products");
const { authRequired } = require("./utils");

productsRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { product_name, price, description } = req.body;
    const newProduct = await createProduct(product_name, price, description);
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
