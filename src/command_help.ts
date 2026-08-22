import type { State } from "./state.js";

export function helpCommand(state: State) {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();
    for (const commandName in state.commands) {
        const command = state.commands[commandName];
        console.log(`${command.name}: ${command.description}`);
    }
}