const express = require("express");
const router = express.Router();
const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");
const JSONbig = require("json-bigint");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { catalogApi } = client;

router.post("/", async (req, res, next) => {
  try {
    // upsert method used to create and update
    const response = await catalogApi.upsertCatalogObject({
      idempotencyKey: randomUUID(),
      object: req.body,
    });
    const catalogObject = JSONbig.parse(
      JSONbig.stringify(response.result.catalogObject)
    );
    res.send(catalogObject);
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach((e) => {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await catalogApi.searchCatalogObjects(req.body);
    const catalogObjects = JSONbig.parse(
      JSONbig.stringify(response.result.objects)
    );
    res.send(catalogObjects);
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach((e) => {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
});

router.get("/items", async (req, res, next) => {
  try {
    const response = await catalogApi.searchCatalogItems(req.body);
    const catalogItems = JSONbig.parse(
      JSONbig.stringify(response.result.items)
    );
    res.send(catalogItems);
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach((e) => {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const response = await catalogApi.retrieveCatalogObject(req.params.id);
    const catalogObject = JSONbig.parse(
      JSONbig.stringify(response.result.object)
    );
    res.send(catalogObject);
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach((e) => {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
});

router.put("/modifiers", async (req, res, next) => {
  try {
    const response = await catalogApi.updateItemModifierLists(req.body);
    res.send(response.result);
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach((e) => {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
});

router.put("/taxes", async (req, res, next) => {
  try {
    const response = await catalogApi.updateItemTaxes(req.body);
    res.send(response.result);
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach((e) => {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await catalogApi.deleteCatalogObject(req.params.id);
    res.send(response.result);
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach((e) => {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
});

module.exports = router;
