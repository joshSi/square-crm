const asyncHandler = require("../utils/async");
const customersService = require("../services/customers");
const customerGroupsService = require("../services/customerGroups");

const createCustomer = asyncHandler(async (req, res) => {
  const customer = await customersService.createCustomer(req.body);
  res.send(customer);
});

const searchCustomers = asyncHandler(async (req, res) => {
  const customers = await customersService.searchCustomers(req.query);
  res.send(customers);
});

const retrieveCustomer = asyncHandler(async (req, res) => {
  const customer = await customersService.retrieveCustomer(req.params.id);
  if (customer.groupIds) {
    customer.groups = await Promise.all(
      customer.groupIds.map(async (groupId) => {
        return await customerGroupsService.retrieveCustomerGroup(groupId);
      })
    );
  }
  res.send(customer);
});

const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await customersService.updateCustomer(
    req.params.id,
    req.body
  );
  res.send(customer);
});

const addGroupToCustomer = asyncHandler(async (req, res) => {
  await customersService.addGroupToCustomer(req.params.id, req.params.groupId);
  const customer = await customersService.retrieveCustomer(req.params.id);
  res.send(customer);
});

const removeGroupFromCustomer = asyncHandler(async (req, res) => {
  await customersService.removeGroupFromCustomer(
    req.params.id,
    req.params.groupId
  );
  const customer = await customersService.retrieveCustomer(req.params.id);
  res.send(customer);
});

const deleteCustomer = asyncHandler(async (req, res) => {
  await customersService.deleteCustomer(req.params.id);
  res.send(`The customer with ID ${req.params.id} has been deleted.`);
});

module.exports = {
  createCustomer,
  searchCustomers,
  retrieveCustomer,
  updateCustomer,
  addGroupToCustomer,
  removeGroupFromCustomer,
  deleteCustomer,
};
