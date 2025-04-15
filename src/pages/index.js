// src/pages/index.js
import * as React from 'react';
import { Link } from 'gatsby';
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
        image="/queer-art-hero.jpg"
        maxWidth="800px"
        title="QUEER. HANDMADE. UNAPOLOGETIC."
        subtitle="Every object tells a story. This is ours."
        ctaLink="View Collection"
        ctaTo="/shop"
      />

      {/* Artist Bio + Process Section */}
      <section className={styles.artistSection}>
        <Container>
          <div className={styles.artistGrid}>
            <div>
            <h3 className={styles.processTitle}>Meet the Artist</h3>
              <p className={styles.bioText}>
                Kevin Agopian is a queer sculptor and multidisciplinary artist. His work moves between clay, text,
                and memory — a tender confrontation with form, identity, and the spaces we inhabit.
                Each piece is carved by hand in his Naarm/Melbourne studio — where process, silence, and slow intention shape the work as much as material.
              </p>
              <blockquote className={styles.quote}>
                “To be queer is to reshape the world in your own image — sculpture is how I carve truth into presence.”
              </blockquote>
            </div>
            <div className={styles.processBlock}>
              <h3 className={styles.processTitle}>In the Studio</h3>
              <ul className={styles.processList}>
                <li>✶ Red clay under fingernails</li>
                <li>✶ Silence before shaping</li>
                <li>✶ Sculpting by touch, not plan</li>
                <li>✶ Glazes inspired by bruises, light, breath</li>
                <li>✶ Queer mythos in every curve</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className={styles.productsSection}>
        <Container>
          <Title as="h2">Featured Pieces</Title>

          <ProductCardGrid
            data={[
              {
                name: 'Vibrance',
                image: '/vessel.jpg',
                price: '75',
                Link: '/product/hand-formed-clay-vessel',
              },
              {
                name: 'Fluidity',
                image: '/sculpture.jpg',
                price: '75',
                Link: '/product/textured-body-sculpture',
              },
              {
                name: 'Resilience',
                image: '/totem.jpg',
                price: '75',
                Link: '/product/queer-totem-set',
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