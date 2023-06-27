const inventoriesRouter = require("express").Router();
const {
  createInventories,
  getInventoryById,
  getAllInventoryById,
  updateInventory,
  deleteInventory,
} = require("../db/adapters/inventory");
const { authRequired } = require("./utils");

inventoriesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;
    const newInventory = await createInventories(product_id, quantity);
    res.send(newInventory);
  } catch (error) {
    next(error);
  }
});

module.exports = inventoriesRouter;
