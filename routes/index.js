const router = require("express").Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});

const cart_itemsRouter = require("./cartitems");
router.use("/cartitems", cart_itemsRouter);
const categoriesRouter = require("./categories");
router.use("/categories", categoriesRouter);
const categoryThroughsRouter = require("./categorythroughs");
router.use("/categorythroughs", categoryThroughsRouter);
const inventoriesRouter = require("./inventories");
router.use("/inventories", inventoriesRouter);
const productsRouter = require("./products");
router.use("/products", productsRouter);
const shoppingCartsRouter = require("./shoppingcarts");
router.use("/shoppingcart", shoppingCartsRouter);
const usersRouter = require("./users");
router.use("/users", usersRouter);

module.exports = router;
