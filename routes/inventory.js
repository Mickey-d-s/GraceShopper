const inventoriesRouter = require("express").Router();
const {
  createInventories,
  getInventoryById,
  getAllInventory,
  updateInventoryQuantity,
  deleteInventory,
  updateInventory,
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
  "/newupdate",
  // authRequired,
  async (req, res, next) => {
    try {
      const { inventory_id, quantity } = req.body; // Extract inventory_id and quantity from the request body
      const updatedQty = await updateInventoryQuantity(inventory_id, quantity);
      res.send(updatedQty);
    } catch (error) {
      next(error);
    }
  }
);

inventoriesRouter.patch("/update", authRequired, async (req, res, next) => {
  try {
    console.log("ping================================");
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      console.log(i, req.body[i]);
      let { product_id, quantity } = req.body[i];
      console.log("within for loop within routes", product_id, quantity);
      const updatedInventory = await updateInventory(product_id, quantity);
      res.send(updatedInventory);
    }
  } catch (error) {
    next(error);
  }
});

inventoriesRouter.patch(
  "/:inventory_id",
  authRequired,
  async (req, res, next) => {
    try {
      const { inventory_id } = req.params;
      console.log("inventory_id", inventory_id);
      const { updatedObj } = req.body;
      console.log("updatedObj", updatedObj);
      const newInventories = await updateInventory(inventory_id, updatedObj);
      res.send(newInventories);
    } catch (error) {
      next(error);
    }
  }
);

inventoriesRouter.delete(
  "/:id",
  //  authRequired,
  async (req, res, next) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      console.log(id);
      const deletedInventory = await deleteInventory(+id);
      const { success, message } = deletedInventory;
      if (success) {
        res.send({ success, message });
      }
      if (!success) {
        res.send({ success, message });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = inventoriesRouter;
