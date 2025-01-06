import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/pokedex">
        <h1>POKEDEX</h1>
      </Link>
    </header>
  );
};

export default Header;