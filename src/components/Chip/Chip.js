import React from 'react';
import * as styles from './Chip.module.css';

const Chip = ({ name, onRemove }) => {
  return (
    <div className={styles.chip}>
      {name}
      {onRemove && (
        <span 
          className={styles.closeIcon} 
          role="button" 
          onClick={() => onRemove(name)}
        >
          ✕
        </span>
      )}
    </div>
  );
};

export default Chip;
