import {State} from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log("Please provide a Pokemon name to catch.");
        return;
    }

    const pokemonName = args[0].toLowerCase();
    try {
        const pokemonData = await state.pokeAPI.fetchPokemon(pokemonName);
        console.log(`Throwing a Pokeball at ${pokemonName}...`);

        if (pokemonData.base_experience <= 0 || Math.random() < pokemonData.base_experience / 100) {
            console.log(`You failed to catch ${pokemonData.name}.`);
            return;
        }
        console.log(`You caught a ${pokemonData.name}!`);
        state.pokedex = state.pokedex || {};
        state.pokedex[pokemonData.name] = pokemonData;
    } catch (error) {
        console.error(`Error fetching Pokemon ${pokemonName}:`, error);
    }
}