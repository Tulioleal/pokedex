/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './TypeBadge.module.scss';
import { pokemonType } from '@/types';
import { capitalizePokemonName } from '@/lib/utils';
import Tooltip from '../Tooltip/Tooltip';

const TypeBadge: React.FC<{
    name: pokemonType;
  }> = ({ 
    name
   }) => {
  return (
    <Tooltip message={capitalizePokemonName(name)}>
      <figure className={`${styles.type_badge} ${styles[name.toLocaleLowerCase()]}`}>
        <img
          src={`/icons/${name}.svg`}
          alt={name}
          loading="lazy"
        />
      </figure>
    </Tooltip>
  );
};

export default TypeBadge;