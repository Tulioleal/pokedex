import Link from "next/link";


export default async function Home() {
  return (
    <main>
      <Link href="/pokedex">Pokedex</Link>
    </main>
  );
}