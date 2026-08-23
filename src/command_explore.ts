import {State} from "./state.js";

export async function exploreCommand(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log("Please provide a location name to explore.");
        return;
    }

    const locationName = args[0].toLowerCase();
    try {
        const pokemonData = await state.pokeAPI.fetchLocation(locationName);
        console.log(`Pokemon found in ${locationName}:`);
        for (const encounter of pokemonData.pokemon_encounters) {
            console.log(encounter.pokemon.name);
        }
    } catch (error) {
        console.error(`Error fetching location ${locationName}:`, error);
    }
}