const inventoriesRouter = require("express").Router();
const {
  createInventories,
  getInventoryById,
  getAllInventory,
  updateInventoryQuantity,
  checkoutInventoryQuantity,
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

inventoriesRouter.get("/", async (req, res, next) => {
  try {
    const AllInventory = await getAllInventory();
    res.send(AllInventory);
  } catch (error) {
    next(error);
  }
});

inventoriesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const inventoryById = await getInventoryById(id);
    console.log("Inventory by id: ", inventoryById);
    res.send({ inventoryById });
  } catch (error) {
    next(error);
  }
});

inventoriesRouter.patch(
  "/update",
  // authRequired,
  async (req, res, next) => {
    try {
      const { inventory_id, quantity } = req.body;
      const updatedQty = await updateInventoryQuantity(inventory_id, quantity);
      res.send(updatedQty);
    } catch (error) {
      next(error);
    }
  }
);

inventoriesRouter.patch(
  "/checkout",
  // authRequired,
  async (req, res, next) => {
    try {
      const { inventory_id, quantity } = req.body;
      const updatedQty = await checkoutInventoryQuantity(
        inventory_id,
        quantity
      );
      res.send(updatedQty);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = inventoriesRouter;
