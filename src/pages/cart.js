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
  const [postcode, setPostcode] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCartItems(JSON.parse(storedCart));

    const existingRef = localStorage.getItem('orderRef');
    if (existingRef) {
      setOrderRef(existingRef);
    } else {
      const newRef = 'QAA-' + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem('orderRef', newRef);
      setOrderRef(newRef);
    }
  }, []);

  useEffect(() => {
    if (shippingMethod === 'post') {
      setPaymentMethod('bank');
    } else if (shippingMethod === 'studio' && paymentMethod === 'bank') {
      setPaymentMethod('bank');
    } else {
      setPaymentMethod('cash');
    }
  }, [shippingMethod]);

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

  const calculateShipping = () => {
    if (shippingMethod === 'post') {
      let baseRate = 8;
      const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      if (postcode.startsWith('2')) baseRate += 2;
      else if (postcode.startsWith('6')) baseRate += 3;
      return baseRate + (quantity - 1) * 2;
    }
    return 0;
  };

  const shippingCost = calculateShipping();

  return (
    <div>
      <div className={styles.contentContainer}>
        <Container className={styles.cartOverride}>
          <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
              <Link className={styles.shopLink} to="/shop">
                <Icon symbol="arrow" />
                <span>Continue Shopping</span>
              </Link>
            </div>
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

              <div className={styles.cartFormWrapper}>
                <div className={styles.selectGroup}>
                  <label htmlFor="shippingMethod">Shipping Method</label>
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
                  <label htmlFor="paymentMethod">Payment Method</label>
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    disabled={shippingMethod === 'post'}
                  >
                    {shippingMethod === 'studio' && <option value="cash">Cash</option>}
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                {paymentMethod === 'bank' && (
                  <div className={styles.bankDetails}>
                    <p><strong>Bank Transfer Details:</strong></p>
                    <p>BSB: 123-456</p>
                    <p>Account Number: 987654321</p>
                    <p>Account Name: Queer Art Australia</p>
                    <p><strong>Please include this Order Reference in your bank transfer:</strong></p>
                    <p className={styles.orderRef}>{orderRef}</p>
                  </div>
                )}

                {shippingMethod === 'post' && (
                  <div className={styles.addressForm}>
                    <label>First Name*
                      <input value={firstName} onChange={(e) => {
                        setFirstName(e.target.value);
                        localStorage.setItem('shippingFirstName', e.target.value);
                      }} />
                    </label>
                    <label>Last Name*
                      <input value={lastName} onChange={(e) => {
                        setLastName(e.target.value);
                        localStorage.setItem('shippingLastName', e.target.value);
                      }} />
                    </label>
                    <label>Address*
                      <textarea value={address} onChange={(e) => {
                        setAddress(e.target.value);
                        localStorage.setItem('shippingAddress', e.target.value);
                      }} />
                    </label>
                    <label>Postcode*
                      <input value={postcode} onChange={(e) => {
                        setPostcode(e.target.value);
                        localStorage.setItem('shippingPostcode', e.target.value);
                      }} />
                    </label>
                    <label>Email*
                      <input value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        localStorage.setItem('shippingEmail', e.target.value);
                      }} />
                    </label>
                    <label>Phone
                      <input value={phone} onChange={(e) => {
                        setPhone(e.target.value);
                        localStorage.setItem('shippingPhone', e.target.value);
                      }} />
                    </label>
                  </div>
                )}

                {shippingMethod === 'studio' && (
                  <div className={styles.orderRefNote}>
                    <p><strong>Your Order Reference:</strong> {orderRef}</p>
                    <p>Please mention this when collecting your order.</p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.sidebar}>
              <OrderSummary
                cartItems={cartItems}
                shippingCost={shippingCost}
                paymentMethod={paymentMethod}
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
