import React, { useState } from 'react';
import { cartAtoms } from '../../store/cartAtoms';
import { useAtom } from 'jotai';

const CheckoutPage = () => {
  const [cart, setCart] = useAtom(cartAtoms);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart, // Send cart items to backend
          amount: cart.reduce((total, item) => total + item.price * item.quantity, 0), // Calculate total amount
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const data = await response.json();
      setPaymentUrl(data.payment_url); // URL to redirect user to dLocal Go
      // Redirect to dLocal Go payment URL
      window.location.href = data.payment_url;

    } catch (error) {
      console.error('Checkout error:', error);
      setError('Could not redirect to payment page. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleCheckout}>Proceed to Payment</button>
      {paymentUrl && (
        <p>Redirecting to payment...</p>
      )}
    </div>
  );
};

export default CheckoutPage;
