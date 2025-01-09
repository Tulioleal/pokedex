/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './TypeBadge.module.scss';
import { Type } from '@/types';
import Link from 'next/link';

const TypeBadge: React.FC<Type> = ({ type }) => {
  return (
    <Link href={`/type/${type.name}`}>
      <figure className={`${styles.type_badge} ${styles[type.name.toLocaleLowerCase()]}`}>
        <img
          src={`/icons/${type.name}.svg`}
          alt={type.name}
          loading="lazy"
        />
      </figure>
    </Link>
  );
};

export default TypeBadge;