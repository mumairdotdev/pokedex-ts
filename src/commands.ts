import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { helpCommand } from "./command_help.js";
import { mapCommand, mapbCommand } from "./command_map.js";
import { exploreCommand } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokex } from "./command_pokedex.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Display a help message",
            callback: helpCommand,
        },
        map: {
            name: "map",
            description: "Display a map of the Pokemon world",
            callback: mapCommand,
        },
        mapb: {
            name: "mapb",
            description: "Display a map of the Pokemon world (backwards)",
            callback: mapbCommand,
        },
        explore: {
            name: "explore <location_name>",
            description: "Explore the Pokemon world locations and find Pokemon",
            callback: exploreCommand,
        },
        catch: {
            name: "catch <pokemon_name>",
            description: "Catch a Pokemon by name",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect <pokemon_name>",
            description: "Inspect a caught Pokemon by name",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "List all caught Pokemon",
            callback: commandPokex,
        },
    };
}