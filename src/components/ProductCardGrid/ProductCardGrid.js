import React, { useState } from 'react';
import * as styles from './ProductCardGrid.module.css';

import Drawer from '../Drawer';
import ProductCard from '../ProductCard';
import QuickView from '../QuickView';
import Slider from '../Slider';

const ProductCardGrid = ({ height, columns = 3, data, spacing, showSlider = false }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  const columnCount = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  const renderCards = () =>
    data.map((product, index) => (
      <ProductCard
        key={index}
        height={height}
        price={product.price}
        imageAlt={product.alt}
        name={product.name}
        image={product.image}
        meta={product.meta}
        originalPrice={product.originalPrice}
        link={product.link}
        showQuickView={() => setShowQuickView(true)}
      />
    ));

  return (
    <div className={styles.root} style={columnCount}>
      <div className={`${styles.cardGrid} ${!showSlider ? styles.show : ''}`} style={columnCount}>
        {data && renderCards()}
      </div>

      {showSlider && (
        <div className={styles.mobileSlider}>
          <Slider spacing={spacing}>{data && renderCards()}</Slider>
        </div>
      )}

      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView close={() => setShowQuickView(false)} />
      </Drawer>
    </div>
  );
};

export default ProductCardGrid;
