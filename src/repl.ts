import { createInterface } from "readline";
import { type State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export function startREPL( state: State ) {
    const { readline, commands } = state;

    readline.prompt();

    readline.on("line", async (input) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            readline.prompt();
            return;
        }

        const commandName = cleanedInput[0];
        const args = cleanedInput.slice(1);
        const cmd = commands[commandName];

        if (!cmd) {
            console.log(`Unknown command: ${commandName}`);
            readline.prompt();
            return;
        } 
        
        try {
            await cmd.callback(state, ...args);
        } catch (e) {
            console.error(`Error occurred while executing command: ${commandName}`);
        }

        readline.prompt();
    });
}