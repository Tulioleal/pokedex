"use client"

import { FC, ReactNode, useState } from 'react';
import styles from './PokedexWrapper.module.scss';
import { useRouter } from 'next/navigation';

interface PokedexWrapperProps {
  children?: string | ReactNode
  openDefault?: boolean
}

const PokedexWrapper:FC<PokedexWrapperProps> = ({
  children,
  openDefault = false
}) => {
  const [open, setOpen] = useState<boolean>(openDefault);
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={`${styles.pokedex} ${open ? styles.open : ''}`}>
        <div className={styles.top}>
          <div className={`${styles.corner} ${styles.left}`} />
          <div className={`${styles.corner} ${styles.right}`} />
          <div className={`${styles.border} ${styles.black}`} />
          <div className={`${styles.border} ${styles.clear}`} />
          <div className={`${styles.border} ${styles.thick} ${styles.black}`} />
          <div  className={`${styles.border} ${styles.blue}`} />
        </div>
        <div className={styles.center}>
          <div className={styles.line}>
            <div className={styles.content}>
              {
                open && !openDefault && <button className={`${styles.button} ${styles.close}`} onClick={() => setOpen(!open)}>
                  Close
                </button>
              }
              {
                openDefault && <button className={`${styles.button} ${styles.back}`} onClick={() => router.back()}>
                  Back
                </button>
              }
              {
                children
              }
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={`${styles.corner} ${styles.left}`} />
          <div className={`${styles.corner} ${styles.right}`} />
          <div className={`${styles.border} ${styles.black}`} />
          <div className={`${styles.border} ${styles.clear}`} />
          <div className={`${styles.border} ${styles.thick} ${styles.black}`} />
          <div  className={`${styles.border} ${styles.blue}`} />
        </div>
        {
          !open && <button className={styles.button} onClick={() => setOpen(!open)}>
            Start
          </button>
        }
      </div>
    </main>
  );
}

export default PokedexWrapper;