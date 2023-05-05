const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");

router.post("/", customersController.createCustomer);
router.get("/", customersController.searchCustomers);
router.get("/:id", customersController.retrieveCustomer);
router.put("/:id", customersController.updateCustomer);
router.put("/:id/add/:groupId", customersController.addGroupToCustomer);
router.put("/:id/remove/:groupId", customersController.removeGroupFromCustomer);
router.delete("/:id", customersController.deleteCustomer);

module.exports = router;
