const express = require("express");
const router = express.Router();
const catalogController = require("../controllers/catalog");

router.post("/", catalogController.createCatalogObject);
router.get("/", catalogController.searchCatalogObjects);
router.get("/items", catalogController.searchCatalogItems);
router.get("/:id", catalogController.retrieveCatalogObject);
router.put("/", catalogController.updateCatalogObject);
router.put("/modifierlists", catalogController.updateItemModifierLists);
router.put("/taxes", catalogController.updateItemTaxes);
router.delete("/:id", catalogController.deleteCatalogObject);

module.exports = router;
