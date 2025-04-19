import React from 'react';
import Icon from '../Icons/Icon';
import * as styles from './RemoveItem.module.css';

const RemoveItem = ({ productId, onRemove }) => {
  const handleRemove = () => {
    if (onRemove && productId) {
      onRemove(productId);
    }
  };

  return (
    <div className={styles.root} role="button" onClick={handleRemove} title="Remove from cart">
      <Icon symbol="cross" />
    </div>
  );
};

export default RemoveItem;
