const shoppingCartsRouter = require("express").Router();
const { deleteCartItem } = require("../db/adapters/cart_items");
const {
  getShoppingCartByUserId,
  updateShoppingCart,
  createShoppingCarts,
  deleteShoppingCartByUserId,
  updateShoppingStatus,
  getAllOrdersByUserId,
  // getShoppingCartById,
} = require("../db/adapters/shoppingcart");
const { authRequired } = require("./utils");

// shoppingCartsRouter.get("/:id", async (req, res, next) => {
//   try {
//     const shoppingCart = await getShoppingCartById(+req.params.id);
//     console.log(shoppingCart);
//     res.send(shoppingCart);
//   } catch (error) {
//     next(error);
//   }
// });

shoppingCartsRouter.get("/user/cart", authRequired, async (req, res, next) => {
  try {
    const shoppingCart = await getShoppingCartByUserId(req.user.user_id);
    res.send(shoppingCart);
    console.log("shoppingCart:", shoppingCart);
  } catch (error) {
    next(error);
  }
});

shoppingCartsRouter.patch(
  "/completed",
  authRequired,
  async (req, res, next) => {
    try {
      const completedCart = await updateShoppingStatus(req.user.user_id);
      res.send(completedCart);
    } catch (error) {
      next(error);
    }
  }
);

shoppingCartsRouter.patch("/:id", authRequired, async (req, res, next) => {
  try {
    const getcart = await getShoppingCartByUserId(+req.params.id);
    if (req.user.id == getcart.customer) {
      const updatecart = await updateShoppingCart(+req.params.id, req.body);
      res.send(updatecart);
    } else {
      //shouldnt hit this....
      res.status(401);
      next({ message: "this isnt your cart" });
    }
  } catch (error) {
    next(error);
  }
});

shoppingCartsRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { status, user_id } = req.body;
    const newCart = await createShoppingCarts({ status, user_id });
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

shoppingCartsRouter.delete("/id", authRequired, async (req, res, next) => {
  const cart = await getShoppingCartByUserId(+req.params.id);
  if (req.user.id == cart.customer) {
    const products = await deleteCartItem(cart.id);
    const shoppingCart = await deleteShoppingCartByUserId(+req.params.id);
    res.send({ message: "shoppingCart deleted" });
  }
});

shoppingCartsRouter.get(
  "/user/order-history",
  authRequired,
  async (req, res, next) => {
    try {
      const orders = await getAllOrdersByUserId(req.user.user_id);
      res.send(orders);
    } catch (error) {
      next(error);
    }
  }
);

// call your get db adapter
// if the user is logged in the user id is off the req.user

module.exports = shoppingCartsRouter;
