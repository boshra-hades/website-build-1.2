import React from 'react';
import Icon from '../Icons/Icon';
import * as styles from './AdjustItem.module.css';

const AdjustItem = ({ quantity = 1, productId, onQuantityChange, isTransparent }) => {
  const handleChange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    if (!isNaN(newQty) && newQty > 0) {
      onQuantityChange?.(productId, newQty);
    }
  };

  const handleIncrement = () => {
    onQuantityChange?.(productId, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange?.(productId, quantity - 1);
    }
  };

  return (
    <div className={`${styles.root} ${isTransparent ? styles.transparent : ''}`}>
      <div className={styles.iconContainer} role="presentation" onClick={handleDecrement}>
        <Icon symbol="minus" />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="number"
          value={quantity}
          onChange={handleChange}
          className={isTransparent ? styles.transparentInput : ''}
          min={1}
        />
      </div>
      <div className={styles.iconContainer} role="presentation" onClick={handleIncrement}>
        <Icon symbol="plus" />
      </div>
    </div>
  );
};

export default AdjustItem;
