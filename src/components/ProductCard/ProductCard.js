import React, { useState } from 'react';
import { navigate } from 'gatsby';
import * as styles from './ProductCard.module.css';

import Icon from '../Icons/Icon';
import CurrencyFormatter from '../CurrencyFormatter';
import { toOptimizedImage } from '../../helpers/general';

const ProductCard = (props) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const {
    image,
    imageAlt,
    name,
    price,
    originalPrice,
    meta,
    height = 580
  } = props;

  const slug = name.toLowerCase().replace(/\s+/g, '-');

  const handleRouteToProduct = () => {
    navigate(`/product/${slug}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        onClick={handleRouteToProduct}
        role="presentation"
      >
        <img
          style={{ height: `${height}px` }}
          src={toOptimizedImage(image)}
          alt={imageAlt}
        />

        {/* Replaced Bag Icon click with link to product */}
        <div
          className={styles.bagContainer}
          role="presentation"
          onClick={handleRouteToProduct}
          title="View Product"
        >
          <Icon symbol="bagPlus" />
        </div>

        <div
          className={styles.heartContainer}
          role="presentation"
          onClick={handleFavorite}
        >
          <Icon symbol="heart" />
          <div
            className={`${styles.heartFillContainer} ${
              isWishlist ? styles.show : styles.hide
            }`}
          >
            <Icon symbol="heartFill" />
          </div>
        </div>
      </div>

      <div className={styles.detailsContainer}>
        <span className={styles.productName}>{name}</span>
        <div className={styles.prices}>
          <span
            className={`${
              originalPrice !== undefined ? styles.salePrice : ''
            }`}
          >
            <CurrencyFormatter amount={price} />
          </span>
          {originalPrice && (
            <span className={styles.originalPrice}>
              <CurrencyFormatter amount={originalPrice} />
            </span>
          )}
        </div>
        <span className={styles.meta}>{meta}</span>
      </div>
    </div>
  );
};

export default ProductCard;
