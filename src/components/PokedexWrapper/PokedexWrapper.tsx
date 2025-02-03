import styles from './PokedexWrapper.module.scss';

const PokedexWrapper = () => {
  return (
    <div className={styles.pokedex}>
      <div className={styles.top}>
        <div className={`${styles.border} ${styles.black}`} />
        <div className={`${styles.border} ${styles.clear}`} />
        <div className={`${styles.border} ${styles.thick} ${styles.black}`} />
        <div  className={`${styles.border} ${styles.blue}`} />
        <div  className={`${styles.border} ${styles.thin} ${styles.dark_blue}`} />
      </div>
      <div className={styles.center}>
        <div className={styles.line}>
          <div>
            
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={`${styles.border} ${styles.black}`} />
        <div className={`${styles.border} ${styles.clear}`} />
        <div className={`${styles.border} ${styles.thick} ${styles.black}`} />
        <div  className={`${styles.border} ${styles.blue}`} />
        <div  className={`${styles.border} ${styles.thin} ${styles.dark_blue}`} />
      </div>
    </div>
  );
}

export default PokedexWrapper;