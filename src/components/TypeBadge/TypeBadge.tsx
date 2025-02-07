/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './TypeBadge.module.scss';
import { pokemonType } from '@/types';
import { capitalizePokemonName } from '@/lib/utils';
import Tooltip from '../Tooltip/Tooltip';

type size = 16 | 32 | 48

const TypeBadge: React.FC<{
    name: pokemonType;
    size?: size;
    showTooltip?: boolean;
  }> = ({ 
    name,
    size = 32,
    showTooltip = true
   }) => {

    const content = (
      <figure style={{width: `${size}px`, height: `${size}px`}}
        className={`${styles.type_badge} ${styles[name.toLocaleLowerCase()]}`}
      >
        <img
          src={`/icons/${name}.svg`}
          alt={name}
          loading="lazy"
          width={size / 2}
          height={size / 2}
        />
      </figure>
    )

  if (showTooltip) {
    return (
      <Tooltip message={capitalizePokemonName(name)}>
        {content}
      </Tooltip>
    )
  }

  return content
};

export default TypeBadge;