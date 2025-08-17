const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const ORDERS_FILE = path.join(__dirname, 'orders.json');

// ✅ Middleware
app.use(cors({
  origin: '*' // allow Netlify frontend
}));
app.use(express.json());

// ✅ Ensure orders.json exists
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}

// ✅ Root route for Railway check
app.get('/', (req, res) => {
  res.send('🥗 Saladific Kiosk API is running! Use /api/orders to view or add orders.');
});

// ✅ Get all orders
app.get('/api/orders', (req, res) => {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read orders.' });
  }
});

// ✅ Add new order
app.post('/api/orders', (req, res) => {
  try {
    const newOrder = req.body;
    newOrder.timestamp = new Date().toISOString();

    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    const orders = JSON.parse(data);

    orders.push(newOrder);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

    res.status(201).json({ message: 'Order saved!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save order.' });
  }
});

// ✅ Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
