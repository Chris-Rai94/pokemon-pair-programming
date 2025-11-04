export default function Card({ pokemon }) {
  return `<h2>${pokemon.name}</h2>
    <p class="${pokemon.type}">Type: ${pokemon.type}</p>
    <p>HP: ${pokemon.hp}</p>
    <p>Attack: ${pokemon.attack}</p>
    <p>Defense: ${pokemon.defense}</p>`;
}
