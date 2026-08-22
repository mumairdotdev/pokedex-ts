import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type State = {
    commands: Record<string, CLICommand>;
    readline: Interface;
    pokeAPI: PokeAPI;
    nextPageURL?: string;
    previousPageURL?: string;
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const pokeAPI = new PokeAPI();

    return {
        commands: getCommands(),
        readline: rl,
        pokeAPI: new PokeAPI(),
        nextPageURL: "",
        previousPageURL: "",
    };
}

