import { Link } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';

import AddItemNotificationContext from '../../context/AddItemNotificationProvider';

import Button from '../Button';
import Icon from '../Icons/Icon';

import * as styles from './AddNotification.module.css';
import { toOptimizedImage } from '../../helpers/general';

const AddNotification = (props) => {
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotif = ctxAddItemNotification.state?.open;

  const [latestItem, setLatestItem] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (storedCart.length > 0) {
      setLatestItem(storedCart[storedCart.length - 1]);
    }
  }, [showNotif]);

  if (!latestItem) return null;

  return (
    <div
      className={`${styles.root} ${
        showNotif === true ? styles.show : styles.hide
      }`}
    >
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Icon symbol="check" />
        </div>
        <span>Item added to bag</span>
      </div>

      <div className={styles.newItemContainer}>
        <div className={styles.imageContainer}>
          <img alt={latestItem.alt} src={toOptimizedImage(latestItem.image)} />
        </div>
        <div className={styles.detailContainer}>
          <span className={styles.name}>{latestItem.name}</span>
          {latestItem.color && (
            <span className={styles.meta}>Color: {latestItem.color}</span>
          )}
          {latestItem.size && (
            <span className={styles.meta}>Size: {latestItem.size}</span>
          )}
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button onClick={props.openCart} level="secondary">
          view my bag ({latestItem.quantity || 1})
        </Button>
        <Button level="primary" href="/cart">
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to="/shop">continue shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default AddNotification;
