import type { State } from './state.js';

export async function mapCommand(state: State): Promise<void> {
    const locations = await state.pokeAPI.fetchLocations(state.nextPageURL);

    state.nextPageURL = locations.next ?? undefined;
    state.previousPageURL = locations.previous ?? undefined;

    for (const location of locations.results) {
        console.log(location.name);
    }
}

export async function mapbCommand(state: State): Promise<void> {
    if (!state.previousPageURL) {
        console.log("No previous page available.");
        return;
    }

    const locations = await state.pokeAPI.fetchLocations(state.previousPageURL);

    state.nextPageURL = locations.next ?? undefined;
    state.previousPageURL = locations.previous ?? undefined;

    for (const location of locations.results) {
        console.log(location.name);
    }
}