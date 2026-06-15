const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-day58';

// For Vercel deployment without MongoDB, use in-memory storage
let items = [];
if (MONGODB_URI && !MONGODB_URI.includes('localhost')) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.log('Using in-memory storage (no MongoDB configured)');
}

// Schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// In-memory storage fallback
const inMemoryStorage = {
  items: [],
  add: function(item) {
    item._id = Date.now().toString();
    item.createdAt = new Date();
    this.items.unshift(item);
    return item;
  },
  getAll: function() {
    return this.items;
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api/items', async (req, res) => {
  try {
    if (MONGODB_URI && !MONGODB_URI.includes('localhost')) {
      const items = await Item.find().sort({ createdAt: -1 });
      res.json(items);
    } else {
      res.json(inMemoryStorage.getAll());
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (MONGODB_URI && !MONGODB_URI.includes('localhost')) {
      const item = new Item({ name, description });
      await item.save();
      res.json(item);
    } else {
      const item = inMemoryStorage.add({ name, description });
      res.json(item);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
