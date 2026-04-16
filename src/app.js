const express = require("express");
const cors = require("cors");
const { orders } = require("./store");
const { ORDER_STATUSES } = require("./constants");
const { generateOrderId, calculateItemsAndTotal } = require("./utils");
const { validateCreateOrderPayload, validateStatus } = require("./validators");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/orders", (req, res) => {
  const errors = validateCreateOrderPayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { customerName, phoneNumber, garments } = req.body;
  const { items, totalAmount } = calculateItemsAndTotal(garments);

  const newOrder = {
    orderId: generateOrderId(),
    customerName,
    phoneNumber,
    status: "RECEIVED",
    items,
    totalAmount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  return res.status(201).json(newOrder);
});

app.patch("/orders/:orderId/status", (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!validateStatus(status)) {
    return res.status(400).json({
      error: `Invalid status. Use one of: ${ORDER_STATUSES.join(", ")}`,
    });
  }

  const order = orders.find((entry) => entry.orderId === orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();

  return res.json(order);
});

app.get("/orders", (req, res) => {
  const { status, search } = req.query;

  let filteredOrders = [...orders];

  if (status) {
    filteredOrders = filteredOrders.filter((entry) => entry.status === status);
  }

  if (search) {
    const searchValue = String(search).toLowerCase();
    filteredOrders = filteredOrders.filter((entry) => {
      const byName = entry.customerName.toLowerCase().includes(searchValue);
      const byPhone = entry.phoneNumber.toLowerCase().includes(searchValue);
      return byName || byPhone;
    });
  }

  return res.json({
    total: filteredOrders.length,
    orders: filteredOrders,
  });
});

app.get("/dashboard", (_req, res) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const ordersPerStatus = ORDER_STATUSES.reduce((acc, status) => {
    acc[status] = orders.filter((order) => order.status === status).length;
    return acc;
  }, {});

  return res.json({
    totalOrders,
    totalRevenue,
    ordersPerStatus,
  });
});

module.exports = app;
