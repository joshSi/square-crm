const asyncHandler = require("../utils/async");
const ordersService = require("../services/orders");

const createOrder = asyncHandler(async (req, res) => {
  const order = await ordersService.createOrder(req.body);
  res.send(order);
});

const searchOrders = asyncHandler(async (req, res) => {
  const orders = await ordersService.searchOrders(req.body);
  res.send(orders);
});

const retrieveOrder = asyncHandler(async (req, res) => {
  const order = await ordersService.retrieveOrder(req.params.id);
  res.send(order);
});

const updateOrder = asyncHandler(async (req, res) => {
  const order = await ordersService.updateOrder(req.params.id, req.body);
  res.send(order);
});

module.exports = {
  createOrder,
  searchOrders,
  retrieveOrder,
  updateOrder,
};
