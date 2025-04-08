import * as React from 'react';
import { Link, navigate } from 'gatsby';
import Hero from '../components/Hero';
import Layout from '../components/Layout/Layout';
import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Title from '../components/Title';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import ProductCardGrid from '../components/ProductCardGrid';
import Highlight from '../components/Highlight';
import Quote from '../components/Quote';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import { toOptimizedImage } from '../helpers/general';
import * as styles from './index.module.css';

const IndexPage = () => {
  // Replace this with real product data as you prepare your inventory
  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <Layout disablePaddingBottom>
      {/* Hero Section */}
      <Hero
        maxWidth={'500px'}
        image={'/banner1.jpg'} 
        title={'Queer Art Australia'}
        subtitle={'Handmade Sculptures Crafted with Passion'}
        ctaText={'View Sculptures'}
        ctaAction={goToShop}
      />

      {/* Message Section */}
      <div className={styles.messageContainer}>
        <p>
          Welcome to <strong>QUEER ART AUSTRALIA</strong> — where every sculpture is a celebration of uniqueness and creative expression.
        </p>
      </div>

      {/* Collection / Featured Sculptures */}
      <div className={styles.collectionContainer}>
        <Container size={'large'}>
          <Title name={'Featured Sculptures'} />
          <ProductCollectionGrid />
        </Container>
      </div>

      {/* New Arrivals or Latest Sculptures */}
      <div className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'New Arrivals'} link={'/shop'} textLink={'view all'} />
          <ProductCardGrid
            spacing={true}
            showSlider
            height={480}
            columns={3}
            data={[]} 
          />
          {/* Replace [] with your dynamic data when ready */}
        </Container>
      </div>

      {/* Highlight Section */}
      <div className={styles.highlightContainer}>
        <Container size={'large'} fullMobile>
          <Highlight
            image={'/highlight.jpg'} 
            altImage={'Highlight Sculpture'}
            miniImage={'/highlight-min.jpg'}
            miniImageAlt={'Mini Highlight Sculpture'}
            title={'Exquisite Detail'}
            description={
              'Each sculpture is meticulously crafted, merging traditional technique with avant-garde aesthetics.'
            }
            textLink={'Learn More'}
            link={'/about'}
          />
        </Container>
      </div>

      {/* Promotion / Secondary Hero */}
      <div className={styles.promotionContainer}>
        <Hero
          image={toOptimizedImage('/promotion-banner.jpg')}
          title={`Exclusive Offer:\nCheck Our Latest Collection`}
        />
        <div className={styles.linkContainers}>
          <Link to={'/shop'}>SHOP NOW</Link>
        </div>
      </div>

      {/* Quote / Brand Statement */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={'About Queer Art Australia'}
        quote={'“Art speaks where words are unable to explain.”'}
      />

      {/* Blog / Journal Section */}
      <div className={styles.blogsContainer}>
        <Container size={'large'}>
          <Title name={'Journal'} subtitle={'Insights & Inspirations'} />
          <BlogPreviewGrid data={[]} />
          {/* Replace [] with dynamic blog data if available */}
        </Container>
      </div>

      {/* Additional Promotion Section */}
      <div className={styles.sustainableContainer}>
        <Hero
          image={toOptimizedImage('/sustainable-banner.jpg')}
          title={'Our Promise'}
          subtitle={'Committed to ethical creation and sustainable art practices.'}
          ctaText={'Read More'}
          maxWidth={'660px'}
          ctaStyle={styles.ctaCustomButton}
        />
      </div>

      {/* Social Media Section */}
      <div className={styles.socialContainer}>
        <Title
          name={'Follow Us'}
          subtitle={'Get behind-the-scenes looks and latest collection updates on Instagram'}
        />
        <div className={styles.socialContentGrid}>
          <img src={toOptimizedImage(`/social/socialMedia1.jpg`)} alt={'social media 1'} />
          <img src={toOptimizedImage(`/social/socialMedia2.jpg`)} alt={'social media 2'} />
          <img src={toOptimizedImage(`/social/socialMedia3.jpg`)} alt={'social media 3'} />
          <img src={toOptimizedImage(`/social/socialMedia4.jpg`)} alt={'social media 4'} />
        </div>
      </div>
      
      <AttributeGrid />
    </Layout>
  );
};

export default IndexPage;
