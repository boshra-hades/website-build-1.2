import React, { useState, useContext } from 'react';
import * as styles from './product.module.css';

import Accordion from '../components/Accordion';
import AdjustItem from '../components/AdjustItem';
import Button from '../components/Button';
import Breadcrumbs from '../components/Breadcrumbs';
import Container from '../components/Container';
import CurrencyFormatter from '../components/CurrencyFormatter';
import Gallery from '../components/Gallery';
import Split from '../components/Split';
import Layout from '../components/Layout/Layout';
import Icon from '../components/Icons/Icon';
import ProductCardGrid from '../components/ProductCardGrid';
import AddItemNotificationContext from '../context/AddItemNotificationProvider';

import products from '../helpers/product.json';

const ProductPage = ({ pageContext }) => {
  const { slug } = pageContext;
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;

  const sampleProduct = products.find((prod) =>
    prod.name.toLowerCase().replace(/\s+/g, '-') === slug
  ) || {};

  const [qty, setQty] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const suggestions = products
    .filter((prod) => prod.name !== sampleProduct.name)
    .slice(0, 4);

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: 'Sculptures', link: '/shop' },
              { label: sampleProduct.name }
            ]}
          />
          <div className={styles.content}>
            <div className={styles.gallery}>
              {sampleProduct.views ? (
                <Gallery images={sampleProduct.views} />
              ) : (
                <Gallery
                  images={[{ image: sampleProduct.image, alt: sampleProduct.alt }]}
                />
              )}
            </div>
            <div className={styles.details}>
              <h1>{sampleProduct.name}</h1>
              <span className={styles.vendor}>by {sampleProduct.artist}</span>
              <div className={styles.priceContainer}>
                <CurrencyFormatter appendZero amount={sampleProduct.price} />
              </div>
              <div className={styles.quantityContainer}>
                <span>Quantity</span>
                <AdjustItem qty={qty} setQty={setQty} />
              </div>
              <div className={styles.actionContainer}>
                <div className={styles.addToButtonContainer}>
                  <Button
                    onClick={() => showNotification()}
                    fullWidth
                    level={'primary'}
                  >
                    Add to Bag
                  </Button>
                </div>
                <div
                  className={styles.wishlistActionContainer}
                  role="presentation"
                  onClick={() => setIsWishlist(!isWishlist)}
                >
                  <Icon symbol={'heart'} />
                  <div
                    className={`${styles.heartFillContainer} ${
                      isWishlist ? styles.show : styles.hide
                    }`}
                  >
                    <Icon symbol={'heartFill'} />
                  </div>
                </div>
              </div>
              <div className={styles.description}>
                <p>{sampleProduct.description}</p>
                <span>Product code: {sampleProduct.sculptureCode}</span>
              </div>
              <div className={styles.informationContainer}>
                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'composition & care'}
                >
                  <p className={styles.information}>{sampleProduct.description}</p>
                </Accordion>
                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'delivery & returns'}
                >
                  <p className={styles.information}>{sampleProduct.description}</p>
                </Accordion>
                <Accordion type={'plus'} customStyle={styles} title={'help'}>
                  <p className={styles.information}>{sampleProduct.description}</p>
                </Accordion>
              </div>
            </div>
          </div>
          <div className={styles.suggestionContainer}>
            <h2>You may also like</h2>
            <ProductCardGrid
              spacing
              showSlider
              height={400}
              columns={4}
              data={suggestions}
            />
          </div>
        </Container>
      
      </div>
    </Layout>
  );
};

export default ProductPage;

