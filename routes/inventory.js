const inventoriesRouter = require("express").Router();
const {
  createInventories,
  getInventoryById,
  getAllInventoryById,
  updateInventory,
  deleteInventory,
} = require("../db/adapters/inventory");
const { authRequired } = require("./utils");

inventoriesRouter.post(
  "/",
  //  authRequired,
  async (req, res, next) => {
    try {
      const { product_id, quantity } = req.body;
      const newInventory = await createInventories(product_id, quantity);
      res.send(newInventory);
    } catch (error) {
      next(error);
    }
  }
);
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

// i don't think the adapter function is right for this, i believe it needs to take in an id as a parameter
inventoriesRouter.get("/:AllInventoryid", async (req, res, next) => {
  try {
    const id = req.params.AllInventoryid;
    const AllInventoryById = await getAllInventoryById(id);
    res.send({ AllInventoryById });
  } catch (error) {
    next(error);
  }
});
//getting you are not authorized for this one too
inventoriesRouter.patch(
  "/:id",
  //  authRequired,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { product_id, quantity } = req.body;
      const updatedInventory = await updateInventory(id, product_id, quantity);
      res.send(updatedInventory);
    } catch (error) {
      next(error);
    }
  }
);
//getting you are not authorized for this one too
inventoriesRouter.delete(
  "/:id",
  //  authRequired,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedInventory = await deleteInventory(id);
      res.send({ message: "Deleted order!" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = inventoriesRouter;
