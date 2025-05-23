import React, { useRef } from 'react';
import Container from '../components/Container';
import Hero from '../components/Hero';
import ThemeLink from '../components/ThemeLink';
import Layout from '../components/Layout/Layout';
import * as styles from './about.module.css';
import { toOptimizedImage } from '../helpers/general';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const AboutPage = () => {
  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <motion.div
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
        >
          <h2>Our Story</h2>
          <p>
            Queer Art Australia began as a deeply personal exploration of identity, transformation, and self-expression.
            Founded in 2019 by Kevin Agopian, each sculpture is an homage to the queer, trans, and non-binary experience —
            raw, intentional, and unapologetically honest.
          </p>
          <blockquote className={styles.quote}>
            “We believe art should not just be seen — it should be felt.”
          </blockquote>
        </motion.div>

        <motion.div
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
        >
          <h2>Values That Shape Us</h2>
          <p>
            Our work is grounded in three principles: authenticity, craft, and care.
            Every piece is made by hand — no shortcuts, no compromises. The result is work that carries soul, texture, and truth.
          </p>
          <p>
            We honor individuality. Every body, every voice, every identity has space here.
            This isn't just about sculpture — it's about visibility, empowerment, and shared stories.
          </p>
        </motion.div>

        <motion.div
          className={styles.imageRow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
        >
          <img src={toOptimizedImage('/Resilience.png')} alt="Sculpture 1" />
          <img src={toOptimizedImage('/VibranceBack.png')} alt="Sculpture 2" />
        </motion.div>

        <motion.div
          className={styles.caption}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
        >
          Hand-carved works from the 2025 transformation series
        </motion.div>

        <motion.div
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
        >
          <h2>Crafting with Care</h2>
          <p>
            We don't claim perfection — but we do act with purpose. From the materials we choose to the methods we refine,
            our studio practices are shaped by an ongoing commitment to care: for the art, for the people who engage with it,
            and for the world that holds us all.
            <br /><br />
            We prioritise quality over quantity, long-term over disposable, and continue to learn how to do better — with humility and intention.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AboutPage;
