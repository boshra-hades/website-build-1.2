import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';

import * as styles from './OrderSummary.module.css';

const OrderSummary = ({ cartItems = [], shippingCost = 0, paymentMethod = 'cash' }) => {
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.1;
  const total = subtotal + gst + shippingCost;

  const hasItems = cartItems.length > 0;

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <span className={styles.title}>order summary</span>

        <div className={styles.calculationContainer}>
          <div className={styles.labelContainer}>
            <span>Subtotal</span>
            <span><CurrencyFormatter amount={subtotal} appendZero /></span>
          </div>
          <div className={styles.labelContainer}>
            <span>GST (10%)</span>
            <span><CurrencyFormatter amount={gst} appendZero /></span>
          </div>
          <div className={styles.labelContainer}>
            <span>Shipping</span>
            <span><CurrencyFormatter amount={shippingCost} appendZero /></span>
          </div>
        </div>

        {hasItems && (
          <div className={styles.couponContainer}>
            <span>Coupon Code</span>
            <FormInputField
              value={coupon}
              handleChange={(_, val) => setCoupon(val)}
              id="couponInput"
              icon="arrow"
            />
            <span>Gift Card</span>
            <FormInputField
              value={giftCard}
              handleChange={(_, val) => setGiftCard(val)}
              id="giftCardInput"
              icon="arrow"
            />
          </div>
        )}

        <div className={styles.totalContainer}>
          <span>Total:</span>
          <span><CurrencyFormatter amount={total} appendZero /></span>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button
          onClick={() => navigate('/orderConfirm')}
          fullWidth
          level="primary"
          disabled={!hasItems}
        >
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to="/shop">CONTINUE SHOPPING</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
