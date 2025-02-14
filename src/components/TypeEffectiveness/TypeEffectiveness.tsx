import { pokemonType } from '@/types';
import { FC } from 'react';
import { TypeWeakness } from '@/lib/TypeWeakness';
import TypeBadge from '../TypeBadge/TypeBadge';
import styles from './TypeEffectiveness.module.scss';
import { POKEMON_TYPES } from '@/lib/const';
import { filterDuplicatedTypes } from '@/lib/utils';

const TypeEffectiveness: FC<{
  types: pokemonType[];
}> = ({ types }) => {
  const DOUBLE_EFFECTIVENESS = types.map((type) => TypeWeakness[type].double).flat();
  const HALF_EFFECTIVENESS = types.map((type) => TypeWeakness[type].half).flat();
  const ZERO_EFFECTIVENESS = types.map((type) => TypeWeakness[type].zero).flat();

  const doubleEffectiveness = filterDuplicatedTypes(DOUBLE_EFFECTIVENESS, HALF_EFFECTIVENESS);
  const halfEffectiveness = filterDuplicatedTypes(HALF_EFFECTIVENESS, DOUBLE_EFFECTIVENESS);
  const normalEffectiveness = filterDuplicatedTypes(POKEMON_TYPES, [
    ...doubleEffectiveness.map((type) => type.type),
    ...halfEffectiveness.map((type) => type.type),
    ...ZERO_EFFECTIVENESS,
  ]);

  return (
    <section className={styles.container}>
      <h2>Effectiveness</h2>
      <table>
        <tbody className={styles.tbody}>
          <tr>
            <td className={`${styles.td} ${styles.normal}`}>
              <h4>Neutral to</h4>
              <span className={styles.types}>
                {normalEffectiveness.length === 0
                  ? 'None'
                  : normalEffectiveness.map((type) => (
                      <span key={type.type}>
                        <TypeBadge name={type.type} />
                      </span>
                    ))}
              </span>
            </td>
          </tr>
          <tr>
            <td className={`${styles.td} ${styles.immune}`}>
              <h4>Immune to</h4>
              <span className={styles.types}>
                {ZERO_EFFECTIVENESS.length === 0
                  ? 'None'
                  : ZERO_EFFECTIVENESS.map((type) => (
                      <span key={type} className={styles.type}>
                        <TypeBadge name={type} />
                      </span>
                    ))}
              </span>
            </td>
          </tr>
          <tr>
            <td className={`${styles.td} ${styles.half}`}>
              <h4>Resistant to</h4>
              <span className={styles.types}>
                {halfEffectiveness.length === 0
                  ? 'None'
                  : halfEffectiveness.map((type, key) => (
                      <span key={key} className={styles.type}>
                        <TypeBadge name={type.type} />
                        <sub>{`x${type.multiplier}`}</sub>
                      </span>
                    ))}
              </span>
            </td>
          </tr>
          <tr>
            <td className={`${styles.td} ${styles.double}`}>
              <h4>Weak to</h4>
              <span className={styles.types}>
                {doubleEffectiveness.length === 0
                  ? 'None'
                  : doubleEffectiveness.map((type) => (
                      <span key={type.type} className={styles.type}>
                        <TypeBadge name={type.type} />
                        <sub>{type.multiplier === 4 ? 'x4' : 'x2'}</sub>
                      </span>
                    ))}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default TypeEffectiveness;
