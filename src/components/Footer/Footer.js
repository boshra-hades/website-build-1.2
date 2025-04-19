import React from 'react';
import { Link } from 'gatsby';
import * as styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <a href="https://www.instagram.com/queer_art_australia" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
      <p className={styles.tagline}>Handmade with care in Naarm 🖐</p>
      <div className={styles.right}>
      © 2025 Built & Designed by <a href="mailto:itcentralhub@outlook.com" className={styles.signature}>BOSHRA</a>

      </div>
    </footer>
  );
};

export default Footer;
