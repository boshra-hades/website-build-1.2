import React, { useState, useEffect } from 'react';
import * as styles from './shop.module.css';

import Banner from '../components/Banner';
import Breadcrumbs from '../components/Breadcrumbs';
import CardController from '../components/CardController';
import Container from '../components/Container';
import Chip from '../components/Chip';
import Icon from '../components/Icons/Icon';
import Layout from '../components/Layout';
import LayoutOption from '../components/LayoutOption';
import ProductCardGrid from '../components/ProductCardGrid';
import Button from '../components/Button';
import Config from '../config.json';

// Import your sculpture product data from JSON file
import products from '../helpers/product.json';

const ShopPage = (props) => {
  // Use your real product data from JSON
  const data = products; // Adjust any filtering if necessary

  useEffect(() => {
    window.addEventListener('keydown', escapeHandler);
    return () => window.removeEventListener('keydown', escapeHandler);
  }, []);

  const escapeHandler = (e) => {
    if (e?.keyCode === undefined) return;
    if (e.keyCode === 27) setShowFilter(false);
  };

  const [showFilter, setShowFilter] = useState(false);

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs
              crumbs={[
                { link: '/', label: 'Home' },
                // Update label if needed – since these are sculptures
                { link: '/shop', label: 'Sculptures' },
                { label: 'All Sculptures' },
              ]}
            />
          </div>
        </Container>
        <Banner
          maxWidth={'650px'}
          name={`Sculptures`}
          subtitle={
            'Explore our collection of handmade clay sculptures that celebrate queer identity through art.'
          }
        />
        <Container size={'large'} spacing={'min'}>
          <div className={styles.metaContainer}>
            <span className={styles.itemCount}>{data.length} items</span>
            <div className={styles.controllerContainer}>
              <div
                className={styles.iconContainer}
                role={'presentation'}
                onClick={() => setShowFilter(!showFilter)}
              >
                <Icon symbol={'filter'} />
                <span>Filters</span>
              </div>
              <div className={`${styles.iconContainer} ${styles.sortContainer}`}>
                <span>Sort by</span>
                <Icon symbol={'caret'} />
              </div>
            </div>
          </div>
          <CardController
            closeFilter={() => setShowFilter(false)}
            visible={showFilter}
            filters={Config.filters}
          />
          <div className={styles.chipsContainer}>
            <Chip name={'White'} />
            <Chip name={'Red'} />
            <Chip name={'Black'} />
          </div>
          <div className={styles.productContainer}>
            <span className={styles.mobileItemCount}>{data.length} items</span>
            <ProductCardGrid data={data} />
          </div>
          <div className={styles.loadMoreContainer}>
            <span>Showing {data.length} of {data.length} items</span>
            <Button fullWidth level={'secondary'}>
              LOAD MORE
            </Button>
          </div>
        </Container>
      </div>

      <LayoutOption />
    </Layout>
  );
};

export default ShopPage;
