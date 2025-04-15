import React, { useState } from 'react';
import * as styles from './shop.module.css';

import Accordion from '../components/Accordion';
import Checkbox from '../components/Checkbox';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import LayoutOption from '../components/LayoutOption';
import ProductCardGrid from '../components/ProductCardGrid';
import Button from '../components/Button';

import Config from '../config.json';
import products from '../helpers/product.json';

const ShopV2Page = () => {
  const [filterState, setFilterState] = useState(Config.filters);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const filterTick = (e, categoryIndex, labelIndex) => {
    const filterStateCopy = [...filterState];
    filterStateCopy[categoryIndex].items[labelIndex].value = e.target.checked;
    setFilterState(filterStateCopy);
  };

  const getActiveFilterValues = (categoryName) => {
    const category = filterState.find(
      (f) => f.category.toLowerCase() === categoryName.toLowerCase()
    );
    return category ? category.items.filter(item => item.value).map(item => item.name.toLowerCase()) : [];
  };

  const handleFilterApply = () => {
    const activeColorFilters = getActiveFilterValues('Colour');
    const newFilteredData = products.filter(product => {
      if (activeColorFilters.length === 0) return true;
      return product.colorOptions?.some(option => activeColorFilters.includes(option.title.toLowerCase()));
    });

    setFilteredProducts(newFilteredData);
  };

  return (
    <Layout>
      <div className={styles.root}>
        <header className={styles.pageHeader}>
          <h1>Sculptures</h1>
          <p>
            Explore our handcrafted clay sculptures that celebrate queer identity and
            creative expression.
          </p>
        </header>

        <Container size={'large'} spacing={'min'}>
          <div className={styles.content}>
            <aside className={styles.filterContainer}>
              {filterState.map((category, categoryIndex) => (
                <Accordion key={categoryIndex} customStyle={styles} title={category.category}>
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className={styles.filters}>
                      <Checkbox
                        size="sm"
                        action={(e) => filterTick(e, categoryIndex, itemIndex)}
                        label={item.name}
                        isChecked={item.value}
                        id={item.name}
                        name={item.name}
                      />
                    </div>
                  ))}
                </Accordion>
              ))}
              <div style={{ marginTop: '16px' }}>
              <Button level="primary" fullWidth onClick={handleFilterApply}>
  APPLY FILTERS
</Button>

{filterState.some(cat => cat.items.some(i => i.value)) && (
  <button
    className={styles.clearButton}
    onClick={() => {
      const resetFilters = filterState.map(cat => ({
        ...cat,
        items: cat.items.map(i => ({ ...i, value: false }))
      }));
      setFilterState(resetFilters);
      setFilteredProducts(products);
    }}
  >
    Clear Filters
  </button>
)}

              </div>
            </aside>

            <section style={{ flex: 1 }}>
              <div className={styles.metaContainer}>
                <span>{filteredProducts.length} items</span>
              </div>
              <ProductCardGrid height="440px" data={filteredProducts} />
            </section>
          </div>

          <div className={styles.loadMoreContainer}>
            <span>
              Showing {filteredProducts.length} of {products.length}
            </span>
            <Button fullWidth level="secondary">LOAD MORE</Button>
          </div>
        </Container>
      </div>
      <LayoutOption />
    </Layout>
  );
};

export default ShopV2Page;
