import React from 'react';
import { navigate } from 'gatsby';

import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../CurrencyFormatter';
import RemoveItem from '../RemoveItem';

import * as styles from './MiniCartItem.module.css';
import { toOptimizedImage } from '../../helpers/general';

const MiniCartItem = ({
  id,
  image,
  alt,
  name,
  price,
  color,
  size,
  quantity = 1,
  slug,
  onQuantityChange,
  onRemove
}) => {
  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role="presentation"
        onClick={() => navigate(`/product/${slug}`)}
      >
        <img src={toOptimizedImage(image)} alt={alt || name} />
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.metaContainer}>
          <span className={styles.name}>{name}</span>
          <div className={styles.priceContainer}>
            <CurrencyFormatter amount={price} />
          </div>
          {color && <span className={styles.meta}>Color: {color}</span>}
          {size && (
            <span className={styles.meta}>
              Size: <span className={styles.size}>{size}</span>
            </span>
          )}
        </div>

        <div className={styles.adjustItemContainer}>
          <AdjustItem
            quantity={quantity}
            productId={id}
            onQuantityChange={onQuantityChange}
          />
        </div>
      </div>

      <div className={styles.closeContainer}>
        <RemoveItem productId={id} onRemove={onRemove} />
      </div>
    </div>
  );
};

export default MiniCartItem;
