import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';

import * as styles from './OrderSummary.module.css';

const OrderSummary = ({ cartItems = [] }) => {
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');

  // ✨ Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const hasItems = cartItems.length > 0;

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <span className={styles.title}>order summary</span>

        <div className={styles.calculationContainer}>
          <div className={styles.labelContainer}>
            <span>Subtotal</span>
            <span>
              <CurrencyFormatter amount={subtotal} appendZero />
            </span>
          </div>
          <div className={styles.labelContainer}>
            <span>Shipping</span>
            <span>---</span>
          </div>
          <div className={styles.labelContainer}>
            <span>Tax</span>
            <span>
              <CurrencyFormatter amount={0} appendZero />
            </span>
          </div>
        </div>

        {hasItems && (
          <div className={styles.couponContainer}>
            <span>Coupon Code</span>
            <FormInputField
              value={coupon}
              handleChange={(_, coupon) => setCoupon(coupon)}
              id="couponInput"
              icon="arrow"
            />
            <span>Gift Card</span>
            <FormInputField
              value={giftCard}
              handleChange={(_, giftCard) => setGiftCard(giftCard)}
              id="giftCardInput"
              icon="arrow"
            />
          </div>
        )}

        <div className={styles.totalContainer}>
          <span>Total:</span>
          <span>
            <CurrencyFormatter amount={subtotal} appendZero />
          </span>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button
          onClick={() => navigate('/orderConfirm')}
          fullWidth
          level="primary"
          disabled={!hasItems} // 🔒 prevent checkout if empty
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
