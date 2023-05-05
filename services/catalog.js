const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");
const JSONbig = require("json-bigint");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { catalogApi } = client;

const upsertCatalogObject = async (upsertObject) => {
  try {
    const response = await catalogApi.upsertCatalogObject({
      idempotencyKey: randomUUID(),
      object: upsertObject,
    });
    const catalogObject = JSONbig.parse(
      JSONbig.stringify(response.result.catalogObject)
    );
    return catalogObject;
  } catch (error) {
    errorLogger(error);
  }
};

const searchCatalogObjects = async (searchObject) => {
  try {
    const response = await catalogApi.searchCatalogObjects(searchObject);
    const catalogObjects = JSONbig.parse(
      JSONbig.stringify(response.result.objects)
    );
    return catalogObjects;
  } catch (error) {
    errorLogger(error);
  }
};

const searchCatalogItems = async (searchObject) => {
  try {
    const response = await catalogApi.searchCatalogItems(searchObject);
    const catalogItems = JSONbig.parse(
      JSONbig.stringify(response.result.items)
    );
    return catalogItems;
  } catch (error) {
    errorLogger(error);
  }
};

const retrieveCatalogObject = async (catalogObjectId) => {
  try {
    const response = await catalogApi.retrieveCatalogObject(catalogObjectId);
    const catalogObject = JSONbig.parse(
      JSONbig.stringify(response.result.object)
    );
    return catalogObject;
  } catch (error) {
    errorLogger(error);
  }
};

const updateItemModifierLists = async (updateObject) => {
  try {
    const response = await catalogApi.updateItemModifierLists(updateObject);
    return response.result;
  } catch (error) {
    errorLogger(error);
  }
};

const updateItemTaxes = async (updateObject) => {
  try {
    const response = await catalogApi.updateItemTaxes(updateObject);
    return response.result;
  } catch (error) {
    errorLogger(error);
  }
};

const deleteCatalogObject = async (catalogObjectId) => {
  try {
    const response = await catalogApi.deleteCatalogObject(catalogObjectId);
    return response.result;
  } catch (error) {
    errorLogger(error);
  }
};

const errorLogger = (error) => {
  if (error instanceof ApiError) {
    error.result.errors.forEach((e) => {
      console.log(e.category);
      console.log(e.code);
      console.log(e.detail);
    });
  } else {
    console.log("Unexpected error occurred: ", error);
  }
};

module.exports = {
  upsertCatalogObject,
  searchCatalogObjects,
  searchCatalogItems,
  retrieveCatalogObject,
  updateItemModifierLists,
  updateItemTaxes,
  deleteCatalogObject,
};
