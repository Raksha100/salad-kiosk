const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const ORDERS_FILE = 'orders.json';

// Ensure orders.json exists
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}

// Get all orders
app.get('/api/orders', (req, res) => {
  const data = fs.readFileSync(ORDERS_FILE);
  res.json(JSON.parse(data));
});

// Add new order
app.post('/api/orders', (req, res) => {
  const newOrder = req.body;
  newOrder.timestamp = new Date().toISOString();

  const data = fs.readFileSync(ORDERS_FILE);
  const orders = JSON.parse(data);

  orders.push(newOrder);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

  res.status(201).json({ message: 'Order saved!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
