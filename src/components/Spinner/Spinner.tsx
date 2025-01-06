import Image from 'next/image';
import styles from './Spinner.module.css';

export const Spinner = () => (
  <figure className={styles.spinner}>
    <Image
      src="/pokeball_pixel.png"
      width={150}
      height={150}
      alt="Loading..."
    ></Image>
  </figure>
);