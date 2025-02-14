import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FC, useEffect, useState } from "react";
import { PokemonCarouseProps, pokemonSize } from "../interface";
import { getPokemonVarieties } from "@/db/getPokemonVarieties";
import { Pokemon } from "@/interfaces";
import PokemonImage from "./PokemonImage";
import styles from "./Image.module.scss";
import { pokemonType } from "@/types";

interface PokemonWithSize extends Pokemon {
  pokemonSize?: pokemonSize;
}

const PokemonCarousel:FC<PokemonCarouseProps> = ({
  pokemonData,
  pokemonSpecies,
  onChangePokemon
}) => {
  const [varietiesData, setVarietiesData] = useState<PokemonWithSize[]>([]);

  useEffect(() => {
    const fetchVarieties = async () => {
      let varieties:PokemonWithSize[] = await getPokemonVarieties(pokemonSpecies.varieties);

      varieties = varieties.map((pokemon) => {
        return {
          ...pokemon,
          pokemonSize: pokemon.height > 15 ?
            200 : pokemonData.height >= 8 ?
            150 : 110
        }
      });

      setVarietiesData(varieties);
    }

    fetchVarieties();

  }, [pokemonSpecies.varieties, pokemonData.height]);

  return (
    <Carousel className={styles.carousel}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      showArrows
      swipeable
      onChange={(e) => onChangePokemon({
        name: varietiesData[e].name,
        types: varietiesData[e].types.map((type) => type.type.name as pokemonType)
      })}
    >
      {
        varietiesData.map((pokemon) => (
          <PokemonImage
            key={pokemon.id}
            pokemonData={pokemon}
            pokemonSize={pokemon.pokemonSize || 110}
          />
        ))
      }
    </Carousel>
  );
}

export default PokemonCarousel;