import {State } from "./state.js";

export async function commandPokex(state: State, ...args: string[]): Promise<void> {
    if (!state.pokedex || Object.keys(state.pokedex).length === 0) {
        console.log("You haven't caught any Pokemon yet.");
        return;
    }

    console.log("Caught Pokemon:");
    for (const pokemonName in state.pokedex) {
        const pokemon = state.pokedex[pokemonName];
        console.log(`- ${pokemon.name}`);
    }
}