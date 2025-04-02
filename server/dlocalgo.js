import axios from 'axios';
import crypto from 'crypto';

const apiKey = 'CKQMEPvUkNeQAmxvERJqClIaCyZmRWXw'; // Replace with your actual API Key - FOR TESTING ONLY, SHOULD BE ENV VAR
const secretKey = 'XbXcslaVnIri9gYMz8fjTLkH4bbWtbXgHJJk81zw'; // Replace with your actual Secret Key - FOR TESTING ONLY, SHOULD BE ENV VAR
const authKey = `${apiKey}:${secretKey}`;
const dlocalApiUrl = 'https://api-sbx.dlocalgo.com/v1'; // Base URL for dLocal API


const generateHmacSignature = (message, secretKey) => {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('hex');
};

export const verifyDlocalWebhookSignature = (authHeader, payload) => {
  if (!authHeader) {
    return false;
  }

  const signatureParts = authHeader.split(',').map(part => part.trim());
  const algoAndVersion = signatureParts[0]; // e.g., V2-HMAC-SHA256
  const receivedSignature = signatureParts[1]?.split(':')[1]?.trim(); // e.g., b71712639e6d93e289e2ec0532a81ef27da72f875d81fdab2328ffffef90b833

  if (!receivedSignature) {
    return false;
  }

  const message = apiKey + payload; // Message for signature verification
  const calculatedSignature = generateHmacSignature(message, secretKey);

  return receivedSignature === calculatedSignature;
};


export const createDlocalPayment = async (paymentData) => {
  try {
    const dlocalGoResponse = await axios.post(
      `${dlocalApiUrl}/payments`, // Correct endpoint for payments
      {
        currency: paymentData.currency,
        amount: paymentData.amount,
        country: paymentData.country,
        order_id: paymentData.order_id, // Consider generating a unique order ID here if not provided
        description: paymentData.description,
        success_url: paymentData.success_url,
        back_url: paymentData.back_url,
        notification_url: paymentData.notification_url,
        payer: { // Minimal payer info - expand as needed
          name: paymentData.payerName,
          email: paymentData.payerEmail
        },
        items: paymentData.items.map(item => ({
          reference: String(item.id),
          description: item.name,
          amount: item.price,
          quantity: item.quantity
        }))
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authKey}`
        }
      }
    );

    return {
      payment_url: dlocalGoResponse.data.redirect_url, // Use redirect_url as per dLocal API response example
      transaction_id: dlocalGoResponse.data.id
    };

  } catch (error) {
    console.error('Error creating payment with dLocal Go:', error);
    if (error.response) {
      console.error('dLocal Go API Response:', error.response.data);
      throw { message: 'Failed to create payment', dlocal_error: error.response.data };
    } else {
      throw { message: 'Failed to create payment', details: error.message };
    }
  }
};

export const retrieveDlocalPayment = async (paymentId) => {
  try {
    const dlocalGoResponse = await axios.get(
      `${dlocalApiUrl}/payments/${paymentId}`, // Correct endpoint for retrieving payment
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authKey}`
        }
      }
    );
    return dlocalGoResponse.data;
  } catch (error) {
    console.error('Error retrieving payment from dLocal Go:', error);
    if (error.response) {
      console.error('dLocal Go API Response:', error.response.data);
      throw { message: 'Failed to retrieve payment', dlocal_error: error.response.data };
    } else {
      throw { message: 'Failed to retrieve payment', details: error.message };
    }
  }
};


export const createDlocalRefund = async (paymentId, refundAmount) => {
  try {
    const refundData = {
      payment_id: paymentId,
      amount: refundAmount, // Optionally refund a partial amount
      notification_url: 'https://your-webhook-url.com/refund-webhook' // Webhook for refund updates
    };

    const dlocalGoResponse = await axios.post(
      `${dlocalApiUrl}/refunds`, // Correct endpoint for refunds
      refundData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authKey}`
        }
      }
    );

    return dlocalGoResponse.data; // Return refund details
  } catch (error) {
    console.error('Error creating refund with dLocal Go:', error);
    if (error.response) {
      console.error('dLocal Go API Response:', error.response.data);
      throw { message: 'Failed to create refund', dlocal_error: error.response.data };
    } else {
      throw { message: 'Failed to create refund', details: error.message };
    }
  }
};
