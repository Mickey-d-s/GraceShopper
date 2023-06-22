const router = require("express").Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});

const usersRouter = require("./users");
router.use("/users", usersRouter);
// const cart_itemsRouter = require("./cart_items.js");
// router.use("/cart_items", cart_itemsRouter);
const categoriesRouter = require("./categories");
router.use("/categories", categoriesRouter);
// const categoryThroughsRouter = require("./categorythroughs");
// router.use("/categorythroughs", categoryThroughsRouter);
// const inventoriesRouter = require("./inventories");
// router.use("/inventories", inventoriesRouter);
// const productsRouter = require("./products");
// router.use("/products", productsRouter);
// const shoppingCartsRouter = require("./shoppingcarts");
// router.use("/shoppingcart", shoppingCartsRouter);

module.exports = router;
