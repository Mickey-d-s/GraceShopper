const shoppingCartsRouter = require("express").Router();
const { deleteCartItem } = require("../db/adapters/cart_items");
const {
  getshoppingcartbyuserid,
  updateshoppingcart,
  createShoppingCarts,
  deleteshoppingcartbyuserid,
} = require("../db/adapters/shoppingcart");
const { authRequired } = require("./utils");

shoppingCartsRouter.get("/:id", async (req, res, next) => {
  try {
    const shoppingCart = await getshoppingcartbyuserid(+req.params.id);
    console.log(shoppingCart);
    res.send(shoppingCart);
  } catch (error) {
    next(error);
  }
});

shoppingCartsRouter.get("/user/cart", authRequired, async (req, res, next) => {
  try {
    const shoppingCart = await getshoppingcartbyuserid(req.user.user_id);
    res.send(shoppingCart);
  } catch (error) {
    next(error);
  }
});

shoppingCartsRouter.patch("/:id", authRequired, async (req, res, next) => {
  try {
    const getcart = await getshoppingcartbyuserid(+req.params.id);
    if (req.user.id == getcart.customer) {
      const updatecart = await updateshoppingcart(+req.params.id, req.body);
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
  const cart = await getshoppingcartbyuserid(+req.params.id);
  if (req.user.id == cart.customer) {
    const products = await deleteCartItem(cart.id);
    const shoppingCart = await deleteshoppingcartbyuserid(+req.params.id);
    res.send({ message: "shoppingCart deleted" });
  }
});

module.exports = shoppingCartsRouter;
