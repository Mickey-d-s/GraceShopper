const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});

router.use("/users", require("./users"));
// router.use("/cart_items", require("./cart_items.js"));
// router.use("/categories", require("./categories"));
// router.use("/categorythroughs", require("./categorythroughs"));
// router.use("/inventories", require("./inventories"));
// router.use("/products", require("./products"));
// router.use("/shoppingcart", require("./shoppingcarts"));

module.exports = router;
