'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import styles from './PokedexWrapper.module.scss';
import { useRouter } from 'next/navigation';

interface PokedexWrapperProps {
  children?: string | ReactNode;
  openDefault?: boolean;
}

const PokedexWrapper: FC<PokedexWrapperProps> = ({ children, openDefault = false }) => {
  const [open, setOpen] = useState(openDefault);
  const [loading, setLoading] = useState(true);
  const [noOpenAnimation, setOpenNoAnimation] = useState(openDefault);
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const toggleOpen = () => {
    localStorage.setItem('pokedexOpen', JSON.stringify(!open));
    setOpen(!open);
    setOpenNoAnimation(false);
  };

  useEffect(() => {
    const pokedexOpen = localStorage.getItem('pokedexOpen');

    if (pokedexOpen) {
      setOpen(JSON.parse(pokedexOpen));
      setOpenNoAnimation(true);
    }

    setLoading(false);
  }, []);

  if (!openDefault && loading) {
    return null;
  }

  return (
    <main className={styles.container}>
      <div
        className={`
        ${styles.pokedex}
        ${open && styles.open}
        ${(openDefault || noOpenAnimation) && styles.openDefault}
        ${opened && !open && styles.closed}
      `}
      >
        <div className={styles.top}>
          <div className={`${styles.corner} ${styles.left}`} />
          <div className={`${styles.corner} ${styles.right}`} />
          <div className={`${styles.border} ${styles.black}`} />
          <div className={`${styles.border} ${styles.clear}`} />
          <div className={`${styles.border} ${styles.thick} ${styles.black}`} />
          <div className={`${styles.border} ${styles.blue}`} />
        </div>
        <div className={styles.center}>
          <div className={styles.line}>
            <div className={styles.content}>
              {open && !openDefault && (
                <button
                  className={`${styles.button} ${styles.close}`}
                  onClick={() => {
                    toggleOpen();
                    setOpened(true);
                  }}
                >
                  {' '}
                  Close
                </button>
              )}
              {openDefault && (
                <button className={`${styles.button} ${styles.back}`} onClick={() => router.back()}>
                  {' '}
                  Back
                </button>
              )}
              {children}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={`${styles.corner} ${styles.left}`} />
          <div className={`${styles.corner} ${styles.right}`} />
          <div className={`${styles.border} ${styles.black}`} />
          <div className={`${styles.border} ${styles.clear}`} />
          <div className={`${styles.border} ${styles.thick} ${styles.black}`} />
          <div className={`${styles.border} ${styles.blue}`} />
        </div>
        {
          <button className={`${styles.button} ${styles.start}`} onClick={toggleOpen}>
            Start
          </button>
        }
      </div>
    </main>
  );
};

export default PokedexWrapper;
