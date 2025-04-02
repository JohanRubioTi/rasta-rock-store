import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { createDlocalPayment } from './dlocalgo.js'; // Import dLocal Go module

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

// API endpoint to create a payment
app.post('/api/payment/create', async (req, res) => {
  try {
    const paymentData = {
      currency: 'USD', // Example currency - get from config or frontend later
      amount: req.body.amount,
      country: 'US',     // Example country - get from config or user profile later
      order_id:  `ORDER-${Date.now()}`, // Generate dynamic order ID
      description: 'Rasta Rock Store Purchase', // Description
      success_url: 'http://localhost:5173/checkout/success', // Replace with actual success URL
      back_url: 'http://localhost:5173/cart',    // Back to cart
      notification_url: 'https://your-webhook-url.com/webhook', // Replace with actual webhook URL
      payerName: 'John Doe', // Example payer name - get from user info later
      payerEmail: 'john.doe@example.com', // Example payer email - get from user info later
      items: req.body.items, // Items from cart
    };

    const { payment_url, transaction_id } = await createDlocalPayment(paymentData);

    res.json({ payment_url, transaction_id });

  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Failed to create payment', details: error }); // Send full error details
  }
});

// API endpoint to retrieve payment details
app.get('/api/payment/:payment_id', async (req, res) => {
  const paymentId = req.params.payment_id;
  if (!paymentId) {
    return res.status(400).json({ error: 'Payment ID is required' });
  }

  try {
    const paymentDetails = await retrieveDlocalPayment(paymentId);
    res.json(paymentDetails);
  } catch (error) {
    console.error('Error retrieving payment details:', error);
    res.status(500).json({ error: 'Failed to retrieve payment details', details: error });
  }
});

// API endpoint to create a refund
app.post('/api/refund/create', async (req, res) => {
  try {
    const paymentId = req.body.payment_id; // Get payment ID from request body
    const refundAmount = req.body.amount; // Optionally get refund amount from request

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required for refund' });
    }

    const refundDetails = await createDlocalRefund(paymentId, refundAmount);
    res.json(refundDetails); // Return refund details to client

  } catch (error) {
    console.error('Error creating refund:', error);
    res.status(500).json({ error: 'Failed to create refund', details: error });
  }
});


// API endpoint to handle dLocal webhook notifications
app.post('/api/payment/webhook', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const payload = JSON.stringify(req.body); // Or req.rawBody if you are using a middleware that modifies req.body

    const isValidSignature = verifyDlocalWebhookSignature(authHeader, payload);

    if (!isValidSignature) {
      console.warn('Webhook signature verification failed!');
      return res.status(401).send('Webhook signature verification failed');
    }

    const webhookData = req.body;
    console.log('dLocal Webhook received (signature verified):', webhookData);

    // TODO: Update order status in database based on webhookData (payment status from webhookData)
    // TODO: Extract payment_id from webhookData to update the correct order

    res.status(200).send('Webhook received and signature verified');
  } catch (error) {
    console.error('Error handling dLocal webhook:', error);
    res.status(400).send('Webhook error');
  }
});


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
