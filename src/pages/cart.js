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

  // Load from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Update quantity
  const updateCartQuantity = (productId, newQty) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Remove item
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
            <div className={styles.shoppingContainer}>
              <Link className={styles.shopLink} to="/shop">
                <Icon symbol="arrow" />
                <span className={styles.continueShopping}>Continue Shopping</span>
              </Link>
            </div>
            <Brand />
            <div className={styles.loginContainer}>
              <Link to="/login">Login</Link>
            </div>
          </div>

          <div className={styles.summaryContainer}>
            <h3>My Bag</h3>
            <div className={styles.cartContainer}>
              <div className={styles.cartItemsContainer}>
                {cartItems.length === 0 ? (
                  <p>Your bag is empty.</p>
                ) : (
                  cartItems.map((item, index) => (
                    <CartItem
                      key={index}
                      {...item}
                      id={item.id}
                      quantity={item.quantity}
                      onQuantityChange={updateCartQuantity}
                      onRemove={removeFromCart}
                    />
                    
                  ))
                )}
              </div>
              <OrderSummary cartItems={cartItems} />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
