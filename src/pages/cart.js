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
  const [shippingMethod, setShippingMethod] = useState('studio');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCartItems(JSON.parse(storedCart));
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

          <div className={styles.cartContainer}>
            <div className={styles.cartItemsContainer}>
              {cartItems.length === 0 ? (
                <p>Your bag is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    {...item}
                    onQuantityChange={updateCartQuantity}
                    onRemove={removeFromCart}
                  />
                ))
              )}
            </div>

            <div className={styles.sidebar}>
              <div className={styles.selectGroup}>
                <label htmlFor="shippingMethod">Shipping</label>
                <select
                  id="shippingMethod"
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                >
                  <option value="studio">Studio Pickup (Free)</option>
                  <option value="post">Australia Post</option>
                </select>
              </div>

              <div className={styles.selectGroup}>
                <label htmlFor="paymentMethod">Payment</label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cash">Cash (on pickup only)</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {shippingMethod === 'post' && (
                <div className={styles.formSection}>
                  <h4>Shipping Details</h4>
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
                    ></textarea>
                  </label>
                  <label>
                    Email*
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Phone
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className={styles.bankDetails}>
                  <p><strong>Bank Transfer Details:</strong></p>
                  <p>BSB: 123-456</p>
                  <p>Account Number: 987654321</p>
                  <p>Account Name: Queer Art Australia</p>
                </div>
              )}

              <OrderSummary
                cartItems={cartItems}
                shippingMethod={shippingMethod}
              />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;