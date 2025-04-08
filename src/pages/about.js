import React, { useRef } from 'react';
import Container from '../components/Container';
import Hero from '../components/Hero';
import ThemeLink from '../components/ThemeLink';
import Layout from '../components/Layout/Layout';
import * as styles from './about.module.css';
import { toOptimizedImage } from '../helpers/general';

const AboutPage = () => {
  const historyRef = useRef();
  const valuesRef = useRef();
  const sustainabilityRef = useRef();

  const handleScroll = (elementReference) => {
    if (elementReference && elementReference.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: elementReference.current.offsetTop - 280,
      });
    }
  };

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        {/* Hero Section */}
        <Hero
          maxWidth={'900px'}
          image={'/about.png'}  // Replace with your desired about-page hero image in the static folder
          title={`QUEER ART AUSTRALIA \n since 2019`}
        />

        <div className={styles.navContainer}>
          <ThemeLink onClick={() => handleScroll(historyRef)} to={'#history'}>
            History
          </ThemeLink>
          <ThemeLink onClick={() => handleScroll(valuesRef)} to={'#values'}>
            Values
          </ThemeLink>
          <ThemeLink onClick={() => handleScroll(sustainabilityRef)} to={'#sustainability'}>
            Sustainability
          </ThemeLink>
        </div>

        <Container size={'large'} spacing={'min'}>
          {/* History Section */}
          <div className={styles.detailContainer} ref={historyRef}>
            <p>
              Queer Art Australia began as a personal journey in embracing authentic
              self-expression and creative freedom. Founded by a passionate artist from the queer community, our sculptures are lovingly
              handcrafted—from raw materials to expressive forms—that capture the essence of transformation and identity.
              Each piece is a vivid celebration of queer, trans, and non-binary experiences, inviting you to experience art that challenges traditional boundaries and honors diversity.
            </p>
          </div>
        </Container>

        <div className={styles.imageContainer}>
          <img alt={'studio or sculpture work'} src={toOptimizedImage('/about1.png')} />
        </div>

        <Container size={'large'} spacing={'min'}>
          <div className={styles.content}>
            {/* Values Section */}
            <h3>Our Values</h3>
            <div ref={valuesRef}>
              <p>
                At Queer Art Australia, our values guide every stroke and chisel mark.
                We celebrate authenticity by honoring each unique identity and creating art that resonates with our vibrant community.
                Our commitment to handcrafted excellence means every sculpture is made with meticulous care,
                ensuring that art becomes a personal expression of strength, resilience, and beauty.
              </p>
              <ol>
                <li>Handcrafted Excellence</li>
                <li>Diverse & Inclusive Expression</li>
                <li>Sustainable & Ethical Practice</li>
              </ol>
              <img alt={'Founder or artistic process'} src={toOptimizedImage('/about2.png')} />
            </div>

            {/* Sustainability Section */}
            <h3>Sustainability</h3>
            <div id={'sustainability'} ref={sustainabilityRef}>
              <p>
                Our artistry is deeply rooted in responsibility.
                We use ethically sourced, natural materials and environmentally conscious methods
                that not only ensure the quality of our sculptures but also reflect a commitment
                to preserving our planet. Every piece is crafted with a dedication to sustainable innovation,
                ensuring that our art honors both the spirit of the queer community and the natural world.
              </p>
            </div>
          </div>
        </Container>

        <div className={styles.imageContainer}>
          <img alt={'artistic view'} src={toOptimizedImage('/about3.png')} />
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
