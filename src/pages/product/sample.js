import React, { useState, useContext } from 'react';
import * as styles from './sample.module.css';

import Accordion from '../../components/Accordion';
import AdjustItem from '../../components/AdjustItem';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import CurrencyFormatter from '../../components/CurrencyFormatter';
import Gallery from '../../components/Gallery';
import Split from '../../components/Split';
import Layout from '../../components/Layout/Layout';
import Icon from '../../components/Icons/Icon';
import ProductCardGrid from '../../components/ProductCardGrid';
import { navigate } from 'gatsby';
import AddItemNotificationContext from '../../context/AddItemNotificationProvider';

// Import your sculpture data from your JSON file
import products from '../../helpers/product.json';

const ProductPage = (props) => {
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;

  // Use a specific product from your JSON data (e.g., the one with sculptureCode "QA001")
  const sampleProduct =
    products.find((prod) => prod.sculptureCode === 'QA001') || {};

  // For the product detail page, we assume your sculptures don't have color or size options.
  // You can remove the swatch and size selection if they are not relevant.
  const [qty, setQty] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  // For suggestions, pick other products (ignoring the sample one)
  const suggestions = products.filter(
    (prod) => prod.sculptureCode !== sampleProduct.sculptureCode
  ).slice(0, 4);

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: 'Sculptures', link: '/shop' },
              { label: sampleProduct.name },
            ]}
          />
          <div className={styles.content}>
            <div className={styles.gallery}>
              {sampleProduct.views ? (
                // If the product has additional views, pass them to Gallery
                <Gallery images={sampleProduct.views} />
              ) : (
                // Otherwise, display its main image
                <Gallery images={[{ image: sampleProduct.image, alt: sampleProduct.alt }]} />
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
                  <Button onClick={() => showNotification()} fullWidth level={'primary'}>
                    Add to Bag
                  </Button>
                </div>
                <div
                  className={styles.wishlistActionContainer}
                  role="presentation"
                  onClick={() => setIsWishlist(!isWishlist)}
                >
                  <Icon symbol={'heart'} />
                  <div className={`${styles.heartFillContainer} ${isWishlist ? styles.show : styles.hide}`}>
                    <Icon symbol={'heartFill'} />
                  </div>
                </div>
              </div>
              <div className={styles.description}>
                <p>{sampleProduct.description}</p>
                <span>Product code: {sampleProduct.sculptureCode}</span>
              </div>
              <div className={styles.informationContainer}>
                <Accordion type={'plus'} customStyle={styles} title={'composition & care'}>
                  <p className={styles.information}>{sampleProduct.description}</p>
                </Accordion>
                <Accordion type={'plus'} customStyle={styles} title={'delivery & returns'}>
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
            <ProductCardGrid spacing showSlider height={400} columns={4} data={suggestions} />
          </div>
        </Container>
        <div className={styles.attributeContainer}>
          <Split
            image={'/cloth.png'}
            alt={'attribute description'}
            title={'Sustainability'}
            description={
              'We design our products to look good and to be used on a daily basis. Our aim is to inspire people to live with a few timeless objects made to last. Quality over quantity is a cornerstone of our ethos—no interest in trends or seasonal collections.'
            }
            ctaText={'learn more'}
            cta={() => navigate('/blog')}
            bgColor={'var(--standard-light-grey)'}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
