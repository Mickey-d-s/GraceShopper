const productsRouter = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
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

productsRouter.get("/", async (req, res, next) => {
  try {
    const AllProducts = await getAllProducts();
    res.send(AllProducts);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const SingleProduct = await getProductById(req.params.id);
    console.log("Get product by id", SingleProduct);
    res.send(SingleProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/:update", authRequired, async (req, res, next) => {
  try {
    const { product_name, price, description } = req.body;
    const UpdatedProduct = await updateProduct(
      req.params.update,
      product_name,
      price,
      description
    );
    res.send(UpdatedProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:product_id", authRequired, async (req, res, next) => {
  try {
    const product_id = req.params.product_id;
    const deletedProduct = await deleteProduct(product_id);
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
