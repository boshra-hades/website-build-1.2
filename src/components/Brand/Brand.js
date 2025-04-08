import React from 'react';
import { navigate } from 'gatsby';

import * as styles from './Brand.module.css';

const Brand = () => {
  return (
    <div
      className={styles.root}
      role="presentation"
      onClick={() => navigate('/')}
    >
      <h4>Queer Art Australia</h4>
      {/*
        Alternatively, if you have a custom logo image, you can use:
        
        <img src="/queer-art-logo.png" alt="Queer Art Australia" />
      
        Make sure to place your logo image (e.g., queer-art-logo.png) in your static folder.
      */}
    </div>
  );
};

export default Brand;
