const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");
const JSONbig = require("json-bigint");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { customersApi } = client;

const createCustomer = async (createObject) => {
  try {
    const response = await customersApi.createCustomer({
      idempotencyKey: randomUUID(),
      ...createObject,
    });
    const customer = JSONbig.parse(JSONbig.stringify(response.result.customer));
    return customer;
  } catch (error) {
    errorLogger(error);
  }
};

const searchCustomers = async (searchObject) => {
  try {
    const response = await customersApi.searchCustomers(searchObject);
    const customers = JSONbig.parse(
      JSONbig.stringify(response.result.customers)
    );
    return customers;
  } catch (error) {
    errorLogger(error);
  }
};

const retrieveCustomer = async (customerId) => {
  try {
    const response = await customersApi.retrieveCustomer(customerId);
    const customer = JSONbig.parse(JSONbig.stringify(response.result.customer));
    return customer;
  } catch (error) {
    errorLogger(error);
  }
};

const updateCustomer = async (customerId, updateObject) => {
  try {
    const response = await customersApi.updateCustomer(
      customerId,
      updateObject
    );
    const customer = JSONbig.parse(JSONbig.stringify(response.result.customer));
    return customer;
  } catch (error) {
    errorLogger(error);
  }
};

const addGroupToCustomer = async (customerId, groupId) => {
  try {
    const response = await customersApi.addGroupToCustomer(customerId, groupId);
    return response.result;
  } catch (error) {
    errorLogger(error);
  }
};

const removeGroupFromCustomer = async (customerId, groupId) => {
  try {
    const response = await customersApi.removeGroupFromCustomer(
      customerId,
      groupId
    );
    return response.result;
  } catch (error) {
    errorLogger(error);
  }
};

const deleteCustomer = async (customerId) => {
  try {
    const response = await customersApi.deleteCustomer(customerId);
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
  createCustomer,
  searchCustomers,
  retrieveCustomer,
  updateCustomer,
  addGroupToCustomer,
  removeGroupFromCustomer,
  deleteCustomer,
};
