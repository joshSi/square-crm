const express = require("express");
const router = express.Router();
const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");
const JSONbig = require("json-bigint");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { customersApi } = client;

router.post("/", async (req, res, next) => {
  try {
    const response = await customersApi.createCustomer({
      idempotencyKey: randomUUID(),
      ...req.body,
    });
    // serialize BigInt
    const customer = JSONbig.parse(JSONbig.stringify(response.result.customer));
    res.send(customer);
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
    const response = await customersApi.searchCustomers(req.body);
    const customers = JSONbig.parse(
      JSONbig.stringify(response.result.customers)
    );
    res.send(customers);
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
    const response = await customersApi.retrieveCustomer(req.params.id);
    const customer = JSONbig.parse(JSONbig.stringify(response.result.customer));
    res.send(customer);
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

router.put("/:id", async (req, res, next) => {
  try {
    const response = await customersApi.updateCustomer(req.params.id, req.body);
    const customer = JSONbig.parse(JSONbig.stringify(response.result.customer));
    res.send(customer);
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

router.put("/:id/:groupId/:action", async (req, res, next) => {
  try {
    const response =
      req.params.action == "add"
        ? await customersApi.addGroupToCustomer(
            req.params.id,
            req.params.groupId
          )
        : await customersApi.removeGroupFromCustomer(
            req.params.id,
            req.params.groupId
          );
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
    const response = await customersApi.deleteCustomer(req.params.id);
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
