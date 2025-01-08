/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './TypeBadge.module.css';
import { Type } from '@/types';

const TypeBadge: React.FC<Type> = ({ type }) => {
  return (
    <figure className={`${styles.type_badge} ${styles[type.name.toLocaleLowerCase()]}`}>
      <img
        src={`/icons/${type.name}.svg`}
        alt={type.name}
        loading="lazy"
      />
    </figure>
  );
};

export default TypeBadge;