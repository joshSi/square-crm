const asyncHandler = require("../utils/async");
const catalogService = require("../services/catalog");

const createCatalogObject = asyncHandler(async (req, res) => {
  const catalogObject = await catalogService.upsertCatalogObject(req.body);
  res.send(catalogObject);
});

const searchCatalogObjects = asyncHandler(async (req, res) => {
  const catalogObjects = await catalogService.searchCatalogObjects(req.body);
  res.send(catalogObjects);
});

const searchCatalogItems = asyncHandler(async (req, res) => {
  const catalogItems = await catalogService.searchCatalogItems(req.body);
  res.send(catalogItems);
});

const retrieveCatalogObject = asyncHandler(async (req, res) => {
  const catalogObject = await catalogService.retrieveCatalogObject(
    req.params.id
  );
  res.send(catalogObject);
});

const updateCatalogObject = asyncHandler(async (req, res) => {
  const catalogObject = await catalogService.upsertCatalogObject(req.body);
  res.send(catalogObject);
});

const updateItemModifierLists = asyncHandler(async (req, res) => {
  const updateTime = await catalogService.updateItemModifierLists(req.body);
  res.send(updateTime);
});

const updateItemTaxes = asyncHandler(async (req, res) => {
  const updateTime = await catalogService.updateItemTaxes(req.body);
  res.send(updateTime);
});

const deleteCatalogObject = asyncHandler(async (req, res) => {
  await catalogService.deleteCatalogObject(req.params.id);
  res.send(`The catalog object with ID ${req.params.id} has been deleted.`);
});

module.exports = {
  createCatalogObject,
  searchCatalogObjects,
  searchCatalogItems,
  retrieveCatalogObject,
  updateCatalogObject,
  updateItemModifierLists,
  updateItemTaxes,
  deleteCatalogObject,
};
