"use client"

import { getPokemonData, getPokemonSpecies } from "@/db/getPokemon";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import styles from "./PokemonCard.module.scss";
import { capitalizePokemonName } from "@/lib/utils";
import TypeBadge from "../TypeBadge/TypeBadge";
import { generalLink, pokemonType } from "@/types";
import { Move as PokemonMove, Pokemon } from "@/interfaces";
import Move from "./Move/Move";
import { PokemonSpecies } from "pokenode-ts";
import PokemonImage from "./Image/PokemonImage";
import PokemonCarousel from "./Image/PokemonCarousel";
import { PokemonCardData, pokemonSize } from "./interface";

export const PokemonCard = (
  { pokemon } :
  { pokemon: generalLink }
) => {
  const [pokemonData, setPokemonData] = useState<Pokemon| null>(null);
  const [pokemonCardData, setPokemonCardData] = useState<PokemonCardData | null>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies| null>(null);
  const [loading, setLoading] = useState(true);
  const [pokemonSize, setPokemonSize] = useState<pokemonSize>(150);
  const [moves, setMoves] = useState<PokemonMove[]>([]);

  useEffect(() => {
    async function fetchPokemon() {
      let index = 0;
      const pokemonData = await getPokemonData(pokemon.name);
      const species = await getPokemonSpecies(pokemonData.id.toString());

      const size = pokemonData.height > 15 ?
        200 : pokemonData.height >= 8 ?
        150 : 110;

      const filteredMoves = pokemonData.moves
        .filter((move) => move.version_group_details[0].move_learn_method.name === "level-up")

      if (species?.evolves_from_species) {
        index = filteredMoves.length -1;
      }

      const randomMoves = filteredMoves.length > 1 ?
        [
          filteredMoves[index == 0 ? 0 : index - 1],
          filteredMoves[index == 0 ? 1 : index]
        ] :
        [
          filteredMoves[0]
        ];

      setPokemonCardData({
        name: pokemonData.name,
        types: pokemonData.types.map((type) => type.type.name as pokemonType)
      });
        
      setMoves(randomMoves);
      setPokemonSize(size);
      setPokemonData(pokemonData);
      setPokemonSpecies(species);
    }
    fetchPokemon().then(() => setLoading(false));
  }, [pokemon.name]);

  const changePokemonCardData = (data: PokemonCardData) => setPokemonCardData(data);

  if (loading || !pokemonData)
    return (
      <div className={styles.pokemonCard}>
        <Spinner/>
      </div>
    );

  return (
    <div className={`
      ${styles.pokemonCard}
      ${styles[`type-${pokemonData.types.map((type) => type.type.name).join("--")}`]}
    `}>
      {
        pokemonSpecies && pokemonSpecies.varieties.length > 1 ?
          <PokemonCarousel
            pokemonData={pokemonData}
            pokemonSpecies={pokemonSpecies}
            onChangePokemon={changePokemonCardData}
          /> :
          <PokemonImage 
            pokemonData={pokemonData}
            pokemonSize={pokemonSize}
          />
      }
      <section className={styles.bottom}>
        <div className={styles.types}>
          {
            (pokemonSpecies && pokemonSpecies.varieties.length > 1 ?
              pokemonCardData?.types.map((type, i) =>
                <TypeBadge name={type} key={i}/>
              ) :
              pokemonData.types.map((type, i) =>
                <TypeBadge name={type.type.name as pokemonType} key={i}/>
              )
            )
          }
        </div>
        <h3 className={styles.name}>
          {
            capitalizePokemonName(pokemonCardData?.name ?? pokemonData.name)
          }
        </h3>
        <ul className={styles.moves}>
          {
            moves.map((move, i) => (
              <li key={i} className={styles.move}>
                <Move url={move.move.url} />
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
}