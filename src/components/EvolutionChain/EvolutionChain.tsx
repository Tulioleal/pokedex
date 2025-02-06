import { EvolutionChain as EvolutionChainInterface } from "pokenode-ts";
import { FC } from "react";
import styles from './EvolutionChain.module.scss';
import { getPokemon } from "@/db/getPokemon";
import Image from "next/image";
import Link from "next/link";
import { capitalizePokemonName } from "@/lib/utils";
import Tooltip from "../Tooltip/Tooltip";
import { pokemonType } from "@/types";

type EvolutionChainProps = {
  url: string;
  type: pokemonType
}

const EvolutionChain:FC<EvolutionChainProps> = async ({
  url, type
}) => {
  const evolutionChain = await getEvolutionChain(url);

  const pokemonEvolutionChain = {
    firstPokemon: evolutionChain.chain.species,
    level2: evolutionChain.chain.evolves_to.map(
      (evolution) => ({
        species: evolution.species,
        method: evolution.evolution_details,
        level3: evolution.evolves_to.map(
          (evolution) => ({
            species: evolution.species,
            method: evolution.evolution_details,
          })
        )
      })
    ).flat(3),
  }

  return (
    <article className={styles.container}>
      <h2>Evolution</h2>
      <div
        className={`
          ${styles.evolutionChain}
          ${styles[type]}
        `}
      >
        <span className={styles.level1}>
          <PokemonSprite
            name={pokemonEvolutionChain.firstPokemon.name}
          />
        </span>
        <div className={styles.evolutions}>
          {pokemonEvolutionChain.level2.map((evolution) => (
            <div key={evolution.species.name} className={styles.chain}>
              <div className={styles.level2}>
                <span className={styles.pokemon}>
                  <PokemonSprite
                    name={evolution.species.name}
                    lastPokemon={evolution.level3.length === 0}
                  />
                </span>
              </div>
              <div className={styles.level3}>
                {evolution.level3.map((evolution) => (
                  <span key={evolution.species.name} className={styles.pokemon}>
                    <PokemonSprite name={evolution.species.name} lastPokemon/>
                  </span>
                ))}
              </div>
            </div>
          ))}  
        </div>
      </div>
    </article>
  );
}

export default EvolutionChain;

async function getEvolutionChain(url: string) {
  const evolutionChainPromise = await fetch(url);
  return await evolutionChainPromise.json() as EvolutionChainInterface;
}

const PokemonSprite = async ({ name, lastPokemon }: { name: string, lastPokemon?: boolean }) => {
  const pokemon = await getPokemon(name);

  return (
    <div className={styles.pokemon}>
      <Tooltip message={capitalizePokemonName(pokemon.name)}>
        <Link href={`/pokedex/${pokemon.name}`} key={pokemon.name}>
          <Image
            alt={pokemon.name}
            src={
              pokemon.sprites.front_default || 
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png" // Default image (Unown)
            }
            width={100}
            height={100}
            />
        </Link>
      </Tooltip>
      {
        !lastPokemon && <span className={styles.arrow}>
          {">"}
        </span>
      }
    </div>
  )
}