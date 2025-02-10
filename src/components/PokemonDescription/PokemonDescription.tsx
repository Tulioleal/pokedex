"use client"

import getPokemonDescription from "@/db/getPokemonDescription";
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from "react";
import { FlavorText } from "pokenode-ts";

const PokemonDescription = ({
  id
}: {
  id:number
}) => {
  const [data, setData] = useState<FlavorText|null>(null);

  useEffect(() => {
    getPokemonDescription(id)
      .then((res) => setData(res))
  }, [id]);

  if (!data) return <></>

  return (
    <TypeAnimation
      style={{
        whiteSpace: 'pre-line',
        minHeight: `${data.flavor_text.length/20}rem`,
        lineHeight:1.5,
        display: 'inline-block'
      }}
      sequence={[data.flavor_text]}
      cursor={false}
      speed={75}
      wrapper="p"
    />
  );
}

export default PokemonDescription;