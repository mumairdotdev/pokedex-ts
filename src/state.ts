import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    commands: Record<string, CLICommand>;
    readline: Interface;
    pokeAPI: PokeAPI;
    nextPageURL?: string;
    previousPageURL?: string;
}

export function initState(cacheInterval: number): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    return {
        commands: getCommands(),
        readline: rl,
        pokeAPI: new PokeAPI(cacheInterval),
        nextPageURL: "",
        previousPageURL: "",
    };
}

