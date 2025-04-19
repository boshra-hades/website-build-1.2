import React, { useState } from 'react';
import { navigate } from 'gatsby';

import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../CurrencyFormatter';
import Drawer from '../Drawer';
import RemoveItem from '../RemoveItem';
import QuickView from '../QuickView';

import * as styles from './CartItem.module.css';
import { toOptimizedImage } from '../../helpers/general';

const CartItem = (props) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const {
    image,
    alt,
    color,
    name,
    size,
    price,
    slug,
    quantity,
    id,
    onQuantityChange, // ✅ new
    onRemove           // ✅ new
  } = props;

  const goToProductPage = () => {
    if (slug) {
      navigate(`/product/${slug}`);
    }
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role="presentation"
        onClick={goToProductPage}
      >
        <img src={toOptimizedImage(image)} alt={alt || name} />
      </div>

      <div className={styles.itemContainer}>
        <span className={styles.name}>{name}</span>
        <div className={styles.metaContainer}>
          {color && <span>Color: {color}</span>}
          {size && <span>Size: {size}</span>}
        </div>
        <div
          className={styles.editContainer}
          role="presentation"
          onClick={() => setShowQuickView(true)}
        >
          <span>Edit</span>
        </div>
      </div>

      <div className={styles.adjustItemContainer}>
        <AdjustItem
          quantity={quantity}
          productId={id || slug}
          onQuantityChange={onQuantityChange} // ✅ now actually changes cart
        />
      </div>

      <div className={styles.priceContainer}>
        <CurrencyFormatter amount={price} appendZero />
      </div>

      <div className={styles.removeContainer}>
        <RemoveItem
          productId={id || slug}
          onRemove={onRemove} // ✅ now triggers deletion from cart
        />
      </div>

      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView productId={id || slug} close={() => setShowQuickView(false)} />
      </Drawer>
    </div>
  );
};

export default CartItem;
