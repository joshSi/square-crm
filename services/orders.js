const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");
const JSONbig = require("json-bigint");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { ordersApi } = client;

const createOrder = async (createObject) => {
  try {
    const response = await ordersApi.createOrder({
      idempotencyKey: randomUUID(),
      ...createObject,
    });
    const order = JSONbig.parse(JSONbig.stringify(response.result.order));
    return order;
  } catch (error) {
    errorLogger(error);
  }
};

const searchOrders = async (searchObject) => {
  try {
    const response = await ordersApi.searchOrders(searchObject);
    const orders = JSONbig.parse(JSONbig.stringify(response.result.orders));
    return orders;
  } catch (error) {
    errorLogger(error);
  }
};

const retrieveOrder = async (orderId) => {
  try {
    const response = await ordersApi.retrieveOrder(orderId);
    const order = JSONbig.parse(JSONbig.stringify(response.result.order));
    return order;
  } catch (error) {
    errorLogger(error);
  }
};

const updateOrder = async (orderId, updateObject) => {
  try {
    const response = await ordersApi.updateOrder(orderId, updateObject);
    const order = JSONbig.parse(JSONbig.stringify(response.result.order));
    return order;
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
  createOrder,
  searchOrders,
  retrieveOrder,
  updateOrder,
};
