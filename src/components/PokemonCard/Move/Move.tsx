'use client';

import { getResource } from '@/db/getResource';
import { Move as PokemonMove } from 'pokenode-ts';
import { FC, useEffect, useState } from 'react';
import styles from './Move.module.scss';
import TypeBadge from '@/components/TypeBadge/TypeBadge';
import { pokemonType } from '@/types';
import { capitalizePokemonName } from '@/lib/utils';

interface MoveProps {
  url: string;
}

const Move: FC<MoveProps> = ({ url }) => {
  const [move, setMove] = useState<PokemonMove | null>(null);
  useEffect(() => {
    getResource(url).then((res) => {
      const moveTemp = res;
      setMove(moveTemp);
    });
  }, [url]);

  if (!move) {
    return null;
  }

  return (
    <div className={styles.move}>
      <TypeBadge name={move.type.name as pokemonType} size={16} showTooltip={false} />
      <span>{capitalizePokemonName(move.name.replace(/-/g, ' '))}</span>
    </div>
  );
};

export default Move;
