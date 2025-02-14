'use client';

import React, { useState } from 'react';
import styles from './Tooltip.module.scss';

function Tooltip({ message, children }: { message: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={styles.container}
    >
      {visible && <div className={styles.tooltip}>{message}</div>}
      {children}
    </div>
  );
}

export default Tooltip;
