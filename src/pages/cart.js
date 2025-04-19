import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary';

import * as styles from './cart.module.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Load cart
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateCartQuantity = (productId, newQty) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size="large" spacing="min">
          <div className={styles.headerContainer}>
            <Link className={styles.shopLink} to="/shop">
              <Icon symbol="arrow" />
              <span>Continue Shopping</span>
            </Link>
            <Brand />
            <div className={styles.loginContainer}>
              <Link to="/login">Login</Link>
            </div>
          </div>

          <h1 className={styles.pageTitle}>My Bag</h1>

          <div className={styles.cartOptions}>
            <div className={styles.selectorSection}>
              <label htmlFor="shipping">Shipping</label>
              <select
                id="shipping"
                value={shippingMethod}
                onChange={e => setShippingMethod(e.target.value)}
              >
                <option value="pickup">Studio Pickup (Free)</option>
                <option value="post">Australia Post</option>
              </select>

              <label htmlFor="payment">Payment</label>
              <select
                id="payment"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <option value="cash">Cash (on pickup only)</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            {shippingMethod === 'post' && (
              <div className={styles.shippingForm}>
                <label>
                  First Name*
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Last Name*
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Address*
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Email*
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Phone
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className={styles.bankDetails}>
                <p>Please transfer the total amount to the following account:</p>
                <p>Please include your name and last name</p>
                <p><strong>BSB:</strong> 123-456</p>
                <p><strong>Account:</strong> 98765432</p>
                <p><strong>Name:</strong> Queer Art Australia</p>
              </div>
            )}
          </div>

          <div className={styles.summaryContainer}>
            <div className={styles.cartItemsContainer}>
              {cartItems.length === 0 ? (
                <p>Your bag is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    {...item}
                    quantity={item.quantity}
                    onQuantityChange={updateCartQuantity}
                    onRemove={removeFromCart}
                  />
                ))
              )}
            </div>

            <OrderSummary
              cartItems={cartItems}
              shippingMethod={shippingMethod}
            />
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
