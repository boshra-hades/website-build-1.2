import React, { useState, useContext } from 'react';
import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import SizeList from '../SizeList';
import SwatchList from '../SwatchList';
import { generateMockProductData } from '../../helpers/mock';
import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import * as styles from './QuickView.module.css';
import { toOptimizedImage } from '../../helpers/general';

const QuickView = (props) => {
  const { close, buttonTitle = 'Add to Bag' } = props;

  // Get sample product data from mock function.
  const sampleProductFromMock = generateMockProductData(1, 'sample')[0] || {};

  // Build a product object with fallback defaults for colorOptions and sizeOptions.
  const sampleProduct = {
    ...sampleProductFromMock,
    colorOptions: sampleProductFromMock?.colorOptions || [
      { color: '#FFFFFF', title: 'White' },
      { color: '#FF0000', title: 'Red' },
      { color: '#000000', title: 'Black' },
    ],
    sizeOptions: sampleProductFromMock?.sizeOptions || ['One Size'],
  };

  // Use context for the add-to-bag notification.
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;

  // Initialize state using safe defaults
  const [activeSwatch, setActiveSwatch] = useState(
    sampleProduct.colorOptions[0]
  );
  const [activeSize, setActiveSize] = useState(sampleProduct.sizeOptions[0]);
  const [qty, setQty] = useState(1);

  const handleAddToBag = () => {
    close();
    showNotification();
  };

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>Select Options</h4>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.productContainer}>
          <span className={styles.productName}>{sampleProduct.name}</span>
          <div className={styles.price}>
            <CurrencyFormatter amount={sampleProduct.price} />
          </div>
          <div className={styles.productImageContainer}>
            <img
              alt={sampleProduct.alt}
              src={toOptimizedImage(sampleProduct.image)}
            />
          </div>
        </div>

        <div className={styles.sectionContainer}>
          <SwatchList
            swatchList={sampleProduct.colorOptions}
            activeSwatch={activeSwatch}
            setActiveSwatch={setActiveSwatch}
          />
        </div>

        <div className={styles.sectionContainer}>
          <SizeList
            sizeList={sampleProduct.sizeOptions}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
          />
        </div>

        <Button onClick={handleAddToBag} fullWidth level={'primary'}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default QuickView;
