export const filterByType = (pokemonList, type) => {
  return pokemonList.filter((pokemon) => pokemon.type === type);
};

export const getPokemonNames = (pokemonList) => {
  return pokemonList.map((pokemon) => pokemon.name);
};

export const getStrongestPokemon = (pokemonList) => {
  let strongest = pokemonList[0];

  for (let i = 1; i < pokemonList.length; i++) {
    if (pokemonList[i].attack > strongest.attack) {
      strongest = pokemonList[i];
    }
  }

  return strongest;
};

export const sortByName = (pokemonList) => {
  // TODO: Implement this function
  // Hint: Use array sort method
  // Remember: Don't mutate the original array!
  return pokemonList;
};

export const buildBalancedTeam = (pokemonList) => {
  // Strategy hints:
  // 1. Group Pokemon by type
  const groupTypes = (list) => {
    return list.reduce((acc, pokemon) => {
      if (!acc[pokemon.type]) {
        acc[pokemon.type] = [];
      }
      acc[pokemon.type].push(pokemon);
      return acc;
    }, {});
  };
  // 2. For each type, pick the one with highest HP
  const HPType = (filterer) => {
    const bestOfType = [];
    for (const type in filterer) {
      const sortedByHP = filterer[type].sort((a, b) => b.hp - a.hp);
      bestOfType.push(sortedByHP[0]);
    }
    return bestOfType;
  };
  // 3. Sort these "best of type" by attack (highest first)
  const ATKType = (bestOfType) => {
    return bestOfType.sort((a, b) => b.attack - a.attack);
  };
  // 4. Try to pick 3 different types that meet attack requirement
  const teambuilder = ATKType(
    groupTypes((pokemonList) => {
      const team = [];
      let totalAttack = 0;
      pokemonList.forEach((pokemon) => {
        if (team.length < 3 && !team.find((p) => p.type === pokemon.type)) {
          team.push(pokemon);
          totalAttack += pokemon.attack;
        }
      });
      if (team.length === 3 && totalAttack >= 150) {
        return team;
      }
      // 5. Return empty array if impossible
      return [];
    })
  );
  // Helper: Group by type
  // Helper: Find best Pokemon per type (highest HP)
  // Helper: Check if team meets attack requirement
  // Your code here
};
