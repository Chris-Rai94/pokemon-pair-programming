import { describe, test, expect } from "vitest";
import {
  filterByType,
  getPokemonNames,
  getStrongestPokemon,
  sortByName,
  buildBalancedTeam,
} from "utils.js";

// Sample test data
const testPokemon = [
  { id: 1, name: "Bulbasaur", type: "grass", hp: 45, attack: 49, defense: 49 },
  { id: 4, name: "Charmander", type: "fire", hp: 39, attack: 52, defense: 43 },
  { id: 7, name: "Squirtle", type: "water", hp: 44, attack: 48, defense: 65 },
  {
    id: 25,
    name: "Pikachu",
    type: "electric",
    hp: 35,
    attack: 55,
    defense: 40,
  },
];

describe("filterByType", () => {
  test("should return only fire type Pokemon", () => {
    const result = filterByType(testPokemon, "fire");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Charmander");
  });

  // TODO: Add test for water type
  // TODO: Add test for type that doesn't exist (should return empty array)
});

describe("getPokemonNames", () => {
  test("should return array of Pokemon names", () => {
    const result = getPokemonNames(testPokemon);
    expect(result).toEqual(["Bulbasaur", "Charmander", "Squirtle", "Pikachu"]);
  });

  // ✅ COMPLETE: This test is done
  test("should return empty array for empty input", () => {
    const result = getPokemonNames([]);
    expect(result).toEqual([]);
  });
});

describe("getStrongestPokemon", () => {
  test("should return Pokemon with highest attack", () => {
    const result = getStrongestPokemon(testPokemon);
    expect(result.name).toBe("Pikachu"); // Pikachu has 55 attack
  });
});

describe("sortByName", () => {
  // TODO: Write test to verify Pokemon are sorted alphabetically
  // TODO: Write test to verify original array is not modified (immutability)
});

describe("buildBalancedTeam", () => {
  const largePokemonPool = [
    { id: 1, name: "Bulbasaur", type: "grass", hp: 45, attack: 49 },
    { id: 4, name: "Charmander", type: "fire", hp: 39, attack: 52 },
    { id: 7, name: "Squirtle", type: "water", hp: 44, attack: 48 },
    { id: 25, name: "Pikachu", type: "electric", hp: 35, attack: 55 },
    { id: 6, name: "Charizard", type: "fire", hp: 78, attack: 84 },
    { id: 9, name: "Blastoise", type: "water", hp: 79, attack: 83 },
  ];

  test("should return team of exactly 3 Pokemon", () => {
    const team = buildBalancedTeam(largePokemonPool);
    expect(team).toHaveLength(3);
  });

  test("should have no duplicate types in team", () => {
    const team = buildBalancedTeam(largePokemonPool);
    const types = team.map((p) => p.type);
    const uniqueTypes = [...new Set(types)];
    expect(types.length).toBe(uniqueTypes.length);
  });

  test("should prefer higher HP when choosing between same type", () => {
    const team = buildBalancedTeam(largePokemonPool);
    const fireType = team.find((p) => p.type === "fire");
    if (fireType) {
      // Should pick Charizard (78 HP) over Charmander (39 HP)
      expect(fireType.name).toBe("Charizard");
    }
  });

  test("should have total attack of at least 150", () => {
    const team = buildBalancedTeam(largePokemonPool);
    const totalAttack = team.reduce((sum, pokemon) => sum + pokemon.attack, 0);
    expect(totalAttack).toBeGreaterThanOrEqual(150);
  });

  test("should return empty array when impossible to build team", () => {
    const insufficientPokemon = [
      { id: 1, name: "Bulbasaur", type: "grass", hp: 45, attack: 30 },
      { id: 2, name: "Ivysaur", type: "grass", hp: 60, attack: 35 },
      // Only 2 Pokemon, both same type, low attack
    ];

    const team = buildBalancedTeam(insufficientPokemon);
    expect(team).toEqual([]);
  });
});
