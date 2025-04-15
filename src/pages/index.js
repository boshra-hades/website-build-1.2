// src/pages/index.js
import * as React from 'react';
import { Link, navigate } from 'gatsby';
import Hero from '../components/Hero';
import Layout from '../components/Layout/Layout';
import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Title from '../components/Title';
import ProductCardGrid from '../components/ProductCardGrid';
import * as styles from './index.module.css';

const IndexPage = () => {
  return (
    <Layout disablePaddingBottom>
      {/* Hero Section */}
      <Hero
        maxWidth={'500px'}
        image={'/queer-art-hero.jpg'}
        title={'Queer Art Australia'}
        subtitle={'Handmade, sculptural, and unapologetically queer'}
      />

      {/* Artist Bio Section */}
      <section className={styles.artistSection}>
        <Container>
          <Title as="h2">Meet the Artist</Title>
          <p className={styles.bioText}>
            Kevin Agopian is a queer sculptor and multidisciplinary artist. His work moves between clay, text,
            and memory — a tender confrontation with form, identity, and the spaces we inhabit.
            Each piece is carved by hand in his Naarm/Melbourne studio — where process, silence, and slow intention shape the work as much as material.
          </p>
          <blockquote className={styles.quote}>
            “To be queer is to reshape the world in your own image — sculpture is how I carve truth into presence.”
          </blockquote>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className={styles.productsSection}>
        <Container>
          <Title as="h2">Featured Pieces</Title>
          
          <ProductCardGrid
  products={[
    {
      title: 'Hand-formed Clay Vessel',
      image: '/products/vessel.jpg',
      price: '$75',
      slug: '/product/hand-formed-clay-vessel',
    },
    {
      title: 'Textured Body Sculpture',
      image: '/products/sculpture.jpg',
      price: '$75',
      slug: '/product/textured-body-sculpture',
    },
    {
      title: 'Queer Totem Set',
      image: '/products/totem.jpg',
      price: '$75',
      slug: '/product/queer-totem-set',
    },
  ]}
/>
          <div className={styles.buttonWrapper}>
            <Link to="/shop" className={styles.viewAllButton}>
              View All Products
            </Link>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default IndexPage;
