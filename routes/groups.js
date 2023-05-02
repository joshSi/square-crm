const express = require("express");
const router = express.Router();
const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");
const JSONbig = require("json-bigint");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { customerGroupsApi } = client;

router.post("/", async (req, res, next) => {
  try {
    const response = await customerGroupsApi.createCustomerGroup({
      idempotencyKey: randomUUID(),
      ...req.body,
    });
    const group = JSONbig.parse(JSONbig.stringify(response.result.group));
    res.send(group);
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
    const response = await customerGroupsApi.listCustomerGroups();
    const groups = JSONbig.parse(JSONbig.stringify(response.result.groups));
    res.send(groups);
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
    const response = await customerGroupsApi.retrieveCustomerGroup(
      req.params.id
    );
    const group = JSONbig.parse(JSONbig.stringify(response.result.group));
    res.send(group);
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
    const response = await customerGroupsApi.updateCustomerGroup(
      req.params.id,
      req.body
    );
    const group = JSONbig.parse(JSONbig.stringify(response.result.group));
    res.send(group);
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
    const response = await customerGroupsApi.deleteCustomerGroup(req.params.id);
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
