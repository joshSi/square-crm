const asyncHandler = require("../utils/async");
const customerGroupsService = require("../services/customerGroups");

const createCustomerGroup = asyncHandler(async (req, res) => {
  const customerGroup = await customerGroupsService.createCustomerGroup(
    req.body
  );
  res.send(customerGroup);
});

const listCustomerGroups = asyncHandler(async (req, res) => {
  const customerGroups = await customerGroupsService.listCustomerGroups();
  res.send(customerGroups);
});

const retrieveCustomerGroup = asyncHandler(async (req, res) => {
  const customerGroup = await customerGroupsService.retrieveCustomerGroup(
    req.params.id
  );
  res.send(customerGroup);
});

const updateCustomerGroup = asyncHandler(async (req, res) => {
  const customerGroup = await customerGroupsService.updateCustomerGroup(
    req.params.id,
    req.body
  );
  res.send(customerGroup);
});

const deleteCustomerGroup = asyncHandler(async (req, res) => {
  await customerGroupsService.deleteCustomerGroup(req.params.id);
  res.send(`The customer group with ID ${req.params.id} has been deleted.`);
});

module.exports = {
  createCustomerGroup,
  listCustomerGroups,
  retrieveCustomerGroup,
  updateCustomerGroup,
  deleteCustomerGroup,
};
