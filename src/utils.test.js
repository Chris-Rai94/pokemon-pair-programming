import { describe, test, expect } from "vitest";
import {
  filterByType,
  getPokemonNames,
  getStrongestPokemon,
  sortByName,
  calculateAverageHP,
} from "./utils.js";

// Sample test data
const MOCK_DATA = [
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
    // Arrange
    const POKEMON_TYPE = "fire";
    const EXPECTED_LENGTH = 1;
    const EXPECTED_NAME = "Charmander";
    // Act
    const result = filterByType(MOCK_DATA, POKEMON_TYPE);

    // Assert
    expect(result.length).toBe(EXPECTED_LENGTH);
    expect(result[0].name).toBe(EXPECTED_NAME);
  });

  test("should return only water type Pokemon", () => {
    const POKEMON_TYPE = "water";
    const EXPECTED_LENGTH = 1;
    const EXPECTED_NAME = "Squirtle";
    const result = filterByType(MOCK_DATA, POKEMON_TYPE);
    expect(result.length).toBe(EXPECTED_LENGTH);
    expect(result[0].name).toBe(EXPECTED_NAME);
  });

  test("should return empty array for non existent type", () => {
    const POKEMON_TYPE = "psychic";
    const EXPECTED_LENGTH = 0;
    const result = filterByType(MOCK_DATA, POKEMON_TYPE);
    expect(result.length).toBe(EXPECTED_LENGTH);
  });
});

describe("getPokemonNames", () => {
  test("should return array of Pokemon names", () => {
    const EXPECTED_ARRAY = ["Bulbasaur", "Charmander", "Squirtle", "Pikachu"];
    const result = getPokemonNames(MOCK_DATA);
    expect(result).toEqual(EXPECTED_ARRAY);
  });

  // ✅ COMPLETE: This test is done
  test("should return empty array for empty input", () => {
    const result = getPokemonNames([]);
    expect(result).toEqual([]);
  });
});

describe("getStrongestPokemon", () => {
  test("should return all pokemon that have the highest attack when there is a tie", () => {
    // Arrange
    const tieData = [
      { name: "Pikachu", attack: 55 },
      { name: "Raichu", attack: 55 },
      { name: "Bulbasaur", attack: 49 },
      { name: "Charmander", attack: 52 },
    ];
    const expectedOutput = [
      { name: "Pikachu", attack: 55 },
      { name: "Raichu", attack: 55 },
    ];
    // Act
    const result = getStrongestPokemon(tieData);
    // Assert
    expect(result).toEqual(expectedOutput);
  });
});

describe("sortByName", () => {
  test("should sort Pokemon by name alphabetically", () => {
    const INPUT = [
      { name: "Squirtle" },
      { name: "Bulbasaur" },
      { name: "Charmander" },
      { name: "Pikachu" },
    ];
    const originalInput = structuredClone(INPUT); // To verify immutability using structuredClone
    const expectedOrder = [
      { name: "Bulbasaur" },
      { name: "Charmander" },
      { name: "Pikachu" },
      { name: "Squirtle" },
    ];

    const result = sortByName(INPUT);
    expect(result).toEqual(expectedOrder);
    expect(INPUT).toEqual(originalInput); // Verify original array is not modified
  });
});

describe("calculateAverageHP", () => {
  test("should calculate average HP correctly", () => {
    const pokemon = [
      { name: "Pikachu", hp: 35 },
      { name: "Charmander", hp: 39 },
      { name: "Squirtle", hp: 44 },
    ];

    const result = calculateAverageHP(pokemon);
    const expectedAvg = (35 + 39 + 44) / 3;

    // Average of 35, 39, 44 = 39.33...
    expect(result).toBeCloseTo(expectedAvg, 1);
  });

  test("should return 0 for empty array", () => {
    const result = calculateAverageHP([]);
    expect(result).toBe(0);
  });

  test("should handle single Pokemon", () => {
    const result = calculateAverageHP([{ hp: 100 }]);
    expect(result).toBe(100);
  });
});
