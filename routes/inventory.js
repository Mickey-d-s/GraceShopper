const inventoriesRouter = require("express").Router();
const {
  createInventories,
  getInventoryById,
  getAllInventoryById,
  updateInventory,
  deleteInventory,
} = require("../db/adapters/inventory");
const { authRequired } = require("./utils");

//not sure if this route is working. it return "you're not authorized", but doesn't let me create even after logging in
inventoriesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;
    const newInventory = await createInventories(product_id, quantity);
    res.send(newInventory);
  } catch (error) {
    next(error);
  }
});
//not sure if working either get's syntax error of select
inventoriesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const InventoryById = await getInventoryById(id);
    res.send({ InventoryById });
  } catch (error) {
    next(error);
  }
});

module.exports = inventoriesRouter;
