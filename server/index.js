import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { createDlocalPayment } from './dlocalgo.js'; // Import dLocal Go module
import { supabase } from '../src/supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(express.json());

// API Endpoints
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .textSearch('name', q);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.get('/api/categories', async (req, res) => {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.get('/api/products/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.params.id)
    .single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(data);
});

app.get('/api/products/:id/related', async (req, res) => {
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('category')
    .eq('id', req.params.id)
    .single();

  if (productError) {
    return res.status(500).json({ error: productError.message });
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', req.params.id)
    .limit(4);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.get('/api/orders', async (req, res) => {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// API endpoint to create a payment
app.post('/api/payment/create', async (req, res) => {
  const { amount, items } = req.body;

  if (!amount || !items) {
    return res.status(400).json({ error: 'Amount and items are required' });
  }

  try {
    const paymentData = {
      currency: 'USD',
      amount,
      country: 'US',
      order_id: `ORDER-${Date.now()}`,
      description: 'Rasta Rock Store Purchase',
      success_url: 'http://localhost:5173/checkout/success',
      back_url: 'http://localhost:5173/cart',
      notification_url: 'https://your-webhook-url.com/webhook',
      payerName: 'John Doe',
      payerEmail: 'john.doe@example.com',
      items,
    };

    const { payment_url, transaction_id } = await createDlocalPayment(paymentData);

    res.json({ payment_url, transaction_id });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Failed to create payment', details: error.message });
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

    const { order_id, status } = webhookData;

    if (order_id && status) {
      const { data, error } = await supabase
        .from('orders')
        .update({ payment_status: status })
        .eq('id', order_id);

      if (error) {
        console.error('Error updating order status:', error);
        return res.status(500).send('Error updating order status');
      }
    }

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
