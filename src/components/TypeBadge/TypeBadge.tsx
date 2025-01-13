/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './TypeBadge.module.scss';
import { PokemonType } from '@/types';
import Link from 'next/link';

const TypeBadge: React.FC<{
    name: PokemonType;
  }> = ({ 
    name
   }) => {
  return (
    <Link href={`/type/${name}`}>
      <figure className={`${styles.type_badge} ${styles[name.toLocaleLowerCase()]}`}>
        <img
          src={`/icons/${name}.svg`}
          alt={name}
          loading="lazy"
        />
      </figure>
    </Link>
  );
};

export default TypeBadge;