import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { helpCommand } from "./command_help.js";
import { mapCommand, mapbCommand } from "./command_map.js";
import { exploreCommand } from "./command_explore.js";


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
        }
    };
}