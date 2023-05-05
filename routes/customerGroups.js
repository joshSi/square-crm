const express = require("express");
const router = express.Router();
const customerGroupsController = require("../controllers/customerGroups");

router.post("/", customerGroupsController.createCustomerGroup);
router.get("/", customerGroupsController.listCustomerGroups);
router.get("/:id", customerGroupsController.retrieveCustomerGroup);
router.put("/:id", customerGroupsController.updateCustomerGroup);
router.delete("/:id", customerGroupsController.deleteCustomerGroup);

module.exports = router;
