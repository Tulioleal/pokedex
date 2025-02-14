export function getPokemonNo(id: number) {
  if (id < 10) {
    return `00${id}`;
  }

  if (id < 100) {
    return `0${id}`;
  }

  return id;
}
