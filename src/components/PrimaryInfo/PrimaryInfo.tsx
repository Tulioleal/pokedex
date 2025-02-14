import { UNOWN_IMAGE } from '@/lib/const';
import PokemonDescription from '../PokemonDescription/PokemonDescription';
import styles from './PrimaryInfo.module.scss';
import { Pokemon } from '@/interfaces';
import { capitalizePokemonName } from '@/lib/utils';
import { pokemonType } from '@/types';
import PrimaryImage from './PrimaryImage';

const PrimaryInfo = (pokemon: Pokemon) => {
  return (
    <section className={styles.container}>
      <h1>{capitalizePokemonName(pokemon.name)}</h1>
      <PrimaryImage
        name={pokemon.name}
        image={pokemon.sprites.other['official-artwork'].front_default || UNOWN_IMAGE}
        types={pokemon.types.map((type) => type.type.name as pokemonType)}
        cry={pokemon.cries.latest}
      />
      <div className={styles.types}>
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className={`${styles.type} ${styles[type.type.name + '-pill']}`}
          >
            {type.type.name.toUpperCase()}
          </span>
        ))}
      </div>
      <PokemonDescription id={pokemon.id} />
    </section>
  );
};

export default PrimaryInfo;
