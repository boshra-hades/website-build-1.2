import React, { useState } from 'react';
import * as styles from './shopV2.module.css';

import Accordion from '../components/Accordion';
import Banner from '../components/Banner';
import Breadcrumbs from '../components/Breadcrumbs';
import Checkbox from '../components/Checkbox';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import LayoutOption from '../components/LayoutOption';
import ProductCardGrid from '../components/ProductCardGrid';
import Button from '../components/Button';
import Chip from '../components/Chip';

import Config from '../config.json';
// Import your product data from JSON file
import products from '../helpers/product.json';

const ShopV2Page = () => {
  const [data] = useState(products);
  const filtersFromConfig = Config.filters;
  const [filterState, setFilterState] = useState(filtersFromConfig);

  // Toggle filter checkbox
  const filterTick = (e, categoryIndex, labelIndex) => {
    const filterStateCopy = [...filterState];
    // Use e.target.checked since that is a Boolean
    filterStateCopy[categoryIndex].items[labelIndex].value = e.target.checked;
    setFilterState(filterStateCopy);
  };

  // Derive active finish filters (assumes category in config is "Finish")
  const activeFinishFilters =
    filterState.find(f => f.category.toLowerCase() === 'finish')?.items
      .filter(item => item.value)
      .map(item => item.name.toLowerCase()) || [];

  // Function to remove an active finish filter (called when a chip is removed)
  const removeFinishFilter = (finishName) => {
    const newFilterState = filterState.map(category => {
      if (category.category.toLowerCase() === 'finish') {
        const updatedItems = category.items.map(item => {
          if (item.name.toLowerCase() === finishName.toLowerCase()) {
            return { ...item, value: false };
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
    setFilterState(newFilterState);
  };

  // Filter the product data based on active finish filters.
  // If no filter is active, show all products.
  const filteredData = data.filter(product => {
    if (activeFinishFilters.length === 0) return true;
    return product.finish && activeFinishFilters.includes(product.finish.toLowerCase());
  });

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { label: 'Sculptures' }
            ]}
          />
        </Container>
        <Banner
          maxWidth={'650px'}
          name={'Sculptures'}
          subtitle={'Explore our handcrafted clay sculptures that celebrate queer identity and creative expression.'}
        />
        <Container size={'large'} spacing={'min'}>
          <div className={styles.content}>
            {/* Render filter accordions */}
            <div className={styles.filterContainer}>
              {filterState.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <Accordion customStyle={styles} title={category.category}>
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={styles.filters}>
                        <Checkbox
                          size={'sm'}
                          action={(e) => filterTick(e, categoryIndex, itemIndex)}
                          label={item.name}
                          checked={item.value}
                          id={item.name}
                          name={item.name}
                        />
                      </div>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Render active filter chips */}
            <div className={styles.chipsContainer}>
              {activeFinishFilters.map((filterName) => (
                <Chip key={filterName} name={filterName} onRemove={removeFinishFilter} />
              ))}
            </div>

            <div>
              <div className={styles.metaContainer}>
                <span className="standardSpan">{filteredData.length} items</span>
              </div>
              <ProductCardGrid height={'440px'} data={filteredData} />
            </div>
          </div>
          <div className={styles.loadMoreContainer}>
            <span>Showing {filteredData.length} of {data.length}</span>
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

export default ShopV2Page;
