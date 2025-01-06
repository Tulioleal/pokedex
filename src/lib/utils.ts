export function capitalizePokemonName(name: string): string {
  if (!name) return name;
  const words = name.split('-');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ');
}