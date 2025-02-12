"use client"

import { FC, ReactNode, useEffect, useState } from 'react';
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
  const [open, setOpen] = useState(openDefault);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleOpen = () => {
    localStorage.setItem('pokedexOpen', JSON.stringify(!open));
    setOpen(!open);
  }

  useEffect(() => {
    setLoading(true);
    const pokedexOpen = localStorage.getItem('pokedexOpen');
  
    if (pokedexOpen) {
      setOpen(JSON.parse(pokedexOpen));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className={styles.container}>
      <div className={`
        ${styles.pokedex}
        ${open && styles.open}
        ${opened && !open && styles.closed}
      `}>
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
              {
                open && !openDefault &&
                  <button
                    className={`${styles.button} ${styles.close}`}
                    onClick={() => {
                      toggleOpen()
                      setOpened(true)
                    }}
                  > Close
                  </button>
              }
              {
                openDefault &&
                  <button
                    className={`${styles.button} ${styles.back}`}
                    onClick={() => router.push('/')}
                  > Back
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
          <button className={`${styles.button} ${styles.start}`} onClick={toggleOpen}>
            Start
          </button>
        }
      </div>
    </main>
  );
}

export default PokedexWrapper;