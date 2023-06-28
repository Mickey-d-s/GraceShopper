const cart_itemsRouter = require("express").Router();
const {
  createCart_Item,
  updateCartItem,
  deleteCartItem,
} = require("../db/adapters/cart_items");
const { authRequired } = require("./utils");

cart_itemsRouter.post(
  "/",
  //  authRequired,
  async (req, res, next) => {
    try {
      const { shoppingcart_id, product_id, count } = req.body;
      const newCart_Item = await createCart_Item(
        shoppingcart_id,
        product_id,
        count
      );
      console.log("newCart_Item:", newCart_Item);
      res.send(newCart_Item);
    } catch (error) {
      next(error);
    }
  }
);

cart_itemsRouter.patch(
  "/:item_id",
  //  authRequired,
  async (req, res, next) => {
    try {
      const { item_id } = req.params;
      const { shoppingcart_id, product_id, count } = req.body;
      console.log(req.body);
      const updatedCartItem = await updateCartItem({
        item_id,
        shoppingcart_id,
        product_id,
        count,
      });
      console.log("updatedCartItem:", updatedCartItem);
      res.send(updatedCartItem);
    } catch (error) {
      next(error);
    }
  }
);

cart_itemsRouter.delete(
  "/:item_id",
  //  authRequired,
  async (req, res, next) => {
    try {
      const { item_id } = req.params;
      const deletedCartItem = await deleteCartItem(item_id);
      res.send({ message: "Deleted cartItem!" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = cart_itemsRouter;
