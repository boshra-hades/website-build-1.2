import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';

import MiniCartItem from '../MiniCartItem';
import CurrencyFormatter from '../CurrencyFormatter';
import Button from '../Button';

import * as styles from './MiniCart.module.css';

const MiniCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    const storedCart = localStorage.getItem('cart');
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCartItems(parsedCart);
  };

  useEffect(() => {
    loadCart();
    const interval = setInterval(loadCart, 300);
    return () => clearInterval(interval);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0),
    0
  );

  const gstAmount = subtotal * 0.10;
  const total = subtotal + gstAmount;

  const updateQuantity = (productId, newQty) => {
    const updated = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );
    localStorage.setItem('cart', JSON.stringify(updated));
    setCartItems(updated);
  };

  const removeItem = (productId) => {
    const updated = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCartItems(updated);
  };

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>My Bag</h4>
      </div>

      {cartItems.length === 0 ? (
        <p className={styles.emptyState}>Your bag is empty.</p>
      ) : (
        <>
          <div className={styles.cartItemsContainer}>
            {cartItems.map((item, index) => (
              <MiniCartItem
                key={index}
                {...item}
                onQuantityChange={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className={styles.summaryContainer}>
            <div className={styles.summaryContent}>
              <div className={styles.totalContainer}>
                <span>Subtotal</span>
                <span>
                  <CurrencyFormatter amount={subtotal} appendZero />
                </span>
              </div>

              <div className={styles.totalContainer}>
                <span>GST (10%)</span>
                <span>
                  <CurrencyFormatter amount={gstAmount} appendZero />
                </span>
              </div>

              <div className={styles.totalContainer}>
                <strong>Total</strong>
                <strong>
                  <CurrencyFormatter amount={total} appendZero />
                </strong>
              </div>

              <span className={styles.taxNotes}>
                Shipping will be calculated at checkout
              </span>

              <Button
                onClick={() => navigate('/cart')}
                level="primary"
                fullWidth
              >
                CHECKOUT
              </Button>

              <div className={styles.linkContainer}>
                <button onClick={() => navigate('/shop')}>CONTINUE SHOPPING</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCart;
