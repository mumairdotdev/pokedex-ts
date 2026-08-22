import { CLICommand } from "./command.js";
import { commandExit } from "./command_exit.js";
import { helpCommand } from "./command_help.js";

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
    };
}