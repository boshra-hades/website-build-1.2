import * as React from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero';
import Container from '../components/Container';
import Title from '../components/Title';
import ProductCardGrid from '../components/ProductCardGrid';
import Quote from '../components/Quote';
import * as styles from './index.module.css';

const IndexPage = () => {
  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <Layout disablePaddingBottom>
      <Hero
  title={<span className={styles.heroTitle}>Queer Art Australia</span>}
  subtitle={'Sculpture as memory. Form as resistance.'}
  ctaText={'Browse Sculptures'}
  ctaAction={goToShop}
  image={'/hero.jpg'} // Add your hero image here
  maxWidth={'700px'}
/>

      <div className={styles.intro}>
        <p>
          We make art that remembers. Queer Art Australia is not just a studio — it’s a space for
          queer, trans, and non-binary stories carved in form, texture, and silence.
        </p>
      </div>

      <Container size="large">
        <Title name="Sculptures" link="/shop" textLink="view all" />
        <ProductCardGrid spacing={true} columns={3} data={[]} />
      </Container>

      <div className={styles.statement}>
        <h2>What We Believe</h2>
        <p>
          Each sculpture is handmade with care, rooted in the belief that craft is power, and beauty is resistance.
          Nothing mass-produced. Nothing impersonal. Everything intentional.
        </p>
      </div>

      <div className={styles.artistBlock}>
        <h2>About the Artist</h2>
        <p>
        Kevin Agopian is a queer Armenian-Lebanese sculptor and tattoo artist whose practice is rooted in transformation, memory, and identity.
        Each piece is carved by hand in his Naarm/Melbourne studio — where process, silence, and slow intention shape the work as much as material.
        </p>
        <p>
        With a background in community work and performance, Kevin brings lived experience into physical form. His sculptures are not just objects — they’re vessels of resistance, softness, and belonging.
  
        </p>
      </div>

      <Quote
        title={''}
        quote={'“We carve space where we were told we didn’t belong.”'}
        bgColor={'var(--standard-light-grey)'}
      />

      <div className={styles.footerCTA}>
        <h3>Follow the journey</h3>
        <p>
          Get behind-the-scenes looks and drop announcements via Instagram.
        </p>
        <a href="https://www.instagram.com/queer_art_australia" className={styles.link}>@queer_art_australia</a>
      </div>
    </Layout>
  );
};

export default IndexPage;
