import type { State } from "./state.js";

export async function helpCommand(state: State): Promise<void> {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();
    for (const commandName in state.commands) {
        const command = state.commands[commandName];
        console.log(`${command.name}: ${command.description}`);
    }
}