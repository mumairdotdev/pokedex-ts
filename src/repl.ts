import { createInterface } from "readline";
import { getCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
    return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();

    rl.on("line", (input) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            rl.prompt();
            return;
        }

        const commandName = cleanedInput[0];
        const commands = getCommands()[commandName];

        if (!commands) {
            console.log(`Unknown command: ${commandName}`);
            rl.prompt();
            return;
        } 
        
        try {
            commands.callback(getCommands());
        } catch (e) {
            console.error(`Error occurred while executing command: ${commandName}`);
        }

        rl.prompt();
    });
}