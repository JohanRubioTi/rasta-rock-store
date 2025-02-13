import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3001;

app.use(express.json());

// Mock Data (In-memory)
const products = [
  { id: 1, name: 'Rasta Hat', description: 'A colorful Rasta hat.', price: 20, imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Rock T-Shirt', description: 'A cool rock band t-shirt.', price: 25, imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Handmade Bracelet', description: 'A unique handmade bracelet.', price: 15, imageUrl: 'https://via.placeholder.com/150'},
  { id: 4, name: 'Smoke Accessory', description: 'A stylish smoke accessory.', price: 30, imageUrl: 'https://via.placeholder.com/150' },
];

const orders = [
  { id: 1, status: 'Pending' },
  { id: 2, status: 'Shipped' },
];

const users = [
    {id: 1, name: "Admin", role: "admin"},
    {id: 2, name: "Editor", role: "editor"}
]

// API Endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/users', (req, res) => {
    res.json(users)
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
