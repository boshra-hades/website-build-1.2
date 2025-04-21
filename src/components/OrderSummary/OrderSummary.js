import React from 'react';
import { Link, navigate } from 'gatsby';
import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import * as styles from './OrderSummary.module.css';

const OrderSummary = ({ cartItems = [], shippingCost = 0 }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.1;
  const total = subtotal + gst + shippingCost;

  const orderRef = 'QAA-' + Math.floor(100000 + Math.random() * 900000);

  const notifyByEmail = async () => {
    const shippingDetails = {
      firstName: localStorage.getItem('shippingFirstName') || '',
      lastName: localStorage.getItem('shippingLastName') || '',
      email: localStorage.getItem('shippingEmail') || '',
      phone: localStorage.getItem('shippingPhone') || '',
      address: localStorage.getItem('shippingAddress') || '',
      postcode: localStorage.getItem('shippingPostcode') || ''
    };

    const message = `You have a new order!\n\nOrder Ref: ${orderRef}\nName: ${shippingDetails.firstName} ${shippingDetails.lastName}\nEmail: ${shippingDetails.email}\nPhone: ${shippingDetails.phone}\nAddress: ${shippingDetails.address}, ${shippingDetails.postcode}\nTotal: $${total.toFixed(2)}`;

    try {
      await fetch('https://formspree.io/f/xqaprepk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'New Order',
          message,
          orderRef,
          total: `$${total.toFixed(2)}`,
          ...shippingDetails
        }),
      });
    } catch (err) {
      console.error('Failed to send order email', err);
    }
  };

  const handlePlaceOrder = async () => {
    await notifyByEmail();
    navigate('/orderConfirm');
  };

  return (
    <div className={styles.summaryBox}>
      <h3 className={styles.title}>Order Summary</h3>
      <div className={styles.summaryRow}>
        <span>Subtotal:</span>
        <span><CurrencyFormatter amount={subtotal} appendZero /></span>
      </div>
      <div className={styles.summaryRow}>
        <span>GST (10%):</span>
        <span><CurrencyFormatter amount={gst} appendZero /></span>
      </div>
      <div className={styles.summaryRow}>
        <span>Shipping:</span>
        <span><CurrencyFormatter amount={shippingCost} appendZero /></span>
      </div>
      <div className={styles.summaryTotal}>
        <strong>Total:</strong>
        <strong><CurrencyFormatter amount={total} appendZero /></strong>
      </div>
      <div className={styles.actionContainer}>
        <Button onClick={handlePlaceOrder} level="primary">
          Place Order
        </Button>
      </div>
      <div className={styles.backLink}>
        <Link to="/shop">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSummary;
