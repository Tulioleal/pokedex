import { generalLink } from "@/types";
import { EvolutionChain as EvolutionChainInterface } from "pokenode-ts";
import { FC } from "react";
import styles from './EvolutionChain.module.scss';
import { getPokemon } from "@/db/getPokemon";
import Image from "next/image";
import Link from "next/link";
import { capitalizePokemonName } from "@/lib/utils";

type EvolutionChainProps = generalLink

const EvolutionChain:FC<EvolutionChainProps> = async ({
  url
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
    <section>
      <h2>Evolution Chain</h2>
      <div className={styles.evolutionChain}>
        <span className={styles.level1}>
          <PokemonSprite firstPokemon
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
                  />
                </span>
              </div>
              <div className={styles.level3}>
                {evolution.level3.map((evolution) => (
                  <span key={evolution.species.name} className={styles.pokemon}>
                    <PokemonSprite name={evolution.species.name}/>
                    {evolution.species.name}
                  </span>
                ))}
              </div>
            </div>
          ))}  
        </div>
      </div>
    </section>
  );
}

export default EvolutionChain;

async function getEvolutionChain(url: string) {
  const evolutionChainPromise = await fetch(url);
  return await evolutionChainPromise.json() as EvolutionChainInterface;
}

const PokemonSprite = async ({ name, firstPokemon }: { name: string, firstPokemon?: boolean }) => {
  const pokemon = await getPokemon(name);

  return (
    <>
      {
        !firstPokemon && <span className={styles.arrow}>
          {">"}
        </span>
      }
      <Link href={`/pokedex/${pokemon.name}`} key={pokemon.name}>
      <abbr content={capitalizePokemonName(pokemon.name)}>
          <Image
            alt={pokemon.name}
            src={
              pokemon.sprites.other.home.front_default || 
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png" // Default image (Unown)
            }
            width={50}
            height={50}
          />
        </abbr>
      </Link>
    </>
  )
}