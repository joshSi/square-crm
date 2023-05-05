const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");
const JSONbig = require("json-bigint");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { customerGroupsApi } = client;

const createCustomerGroup = async (createObject) => {
  try {
    const response = await customerGroupsApi.createCustomerGroup({
      idempotencyKey: randomUUID(),
      ...createObject,
    });
    const customerGroup = JSONbig.parse(
      JSONbig.stringify(response.result.group)
    );
    return customerGroup;
  } catch (error) {
    errorLogger(error);
  }
};

const listCustomerGroups = async () => {
  try {
    const response = await customerGroupsApi.listCustomerGroups();
    const customerGroups = JSONbig.parse(
      JSONbig.stringify(response.result.groups)
    );
    return customerGroups;
  } catch (error) {
    errorLogger(error);
  }
};

const retrieveCustomerGroup = async (customerGroupId) => {
  try {
    const response = await customerGroupsApi.retrieveCustomerGroup(
      customerGroupId
    );
    const customerGroup = JSONbig.parse(
      JSONbig.stringify(response.result.group)
    );
    return customerGroup;
  } catch (error) {
    errorLogger(error);
  }
};

const updateCustomerGroup = async (customerGroupId, updateObject) => {
  try {
    const response = await customerGroupsApi.updateCustomerGroup(
      customerGroupId,
      updateObject
    );
    const customerGroup = JSONbig.parse(
      JSONbig.stringify(response.result.group)
    );
    return customerGroup;
  } catch (error) {
    errorLogger(error);
  }
};

const deleteCustomerGroup = async (customerGroupId) => {
  try {
    const response = await customerGroupsApi.deleteCustomerGroup(
      customerGroupId
    );
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
  createCustomerGroup,
  listCustomerGroups,
  retrieveCustomerGroup,
  updateCustomerGroup,
  deleteCustomerGroup,
};
