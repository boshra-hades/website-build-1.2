import React from 'react';
import * as styles from './Container.module.css';

const Container = ({ children, size, spacing, fullMobile, className = '' }) => {
  return (
    <div
      className={`
        ${styles.container}
        ${size ? styles[size] : ''}
        ${spacing ? styles[spacing] : ''}
        ${fullMobile === true ? styles.fullMobile : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
