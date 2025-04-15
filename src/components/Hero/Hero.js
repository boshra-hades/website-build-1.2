import React from 'react';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import * as styles from './Hero.module.css';
import { toOptimizedImage } from '../../helpers/general';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Hero = ({ title, subtitle, image, maxWidth, ctaLink, ctaTo }) => {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroOverlay}></div>

      {/* Image */}
      <img src={toOptimizedImage(image)} alt="Hero" className={styles.heroImage} />

      {/* Text Content */}
      <div className={styles.heroContentWrapper}>
        <motion.div
          className={styles.heroTextBlock}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className={styles.heroTitle} custom={1} variants={fadeUp}>
            {title}
          </motion.h1>

          <motion.p className={styles.heroSubtitle} custom={2} variants={fadeUp}>
            {subtitle}
          </motion.p>

          <motion.p className={styles.heroIntro} custom={3} variants={fadeUp}>
            Kevin Agopian’s 2024 Totem Series
          </motion.p>

          <motion.div className={styles.heroDetails} custom={4} variants={fadeUp}>
            <span className={styles.heroTag}>
              ✶ Featured Series · Handmade in Naarm
            </span>
            {ctaLink && (
              <Link to={ctaTo} className={styles.heroButton}>
                {ctaLink}
              </Link>
            )}
          </motion.div>

          <motion.div className={styles.scrollCue} custom={5} variants={fadeUp}>
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
