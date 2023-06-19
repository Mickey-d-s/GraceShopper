const cart_itemsRouter = require("express").Router();
const { authRequired } = require("./utils");

// cart_itemsRouter.post("/", authRequired, async (req, res, next)=>{
//     try {
//         const { productId } = req.body;
//         const newActivity = await createActivity({ name, description });
//         res.send(newActivity);
//       } catch (error) {
//         next(error);
//       }
// })
