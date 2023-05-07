const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");

router.post("/", ordersController.createOrder);
router.get("/", ordersController.searchOrders);
router.get("/:id", ordersController.retrieveOrder);
router.put("/", ordersController.updateOrder);

module.exports = router;
