import { createInterface } from "readline";

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

        const command = cleanedInput[0];
        console.log("Your command was:", command);
        rl.prompt();
    });

    rl.on("close", () => {
        console.log("Exiting REPL. Goodbye!");
        process.exit(0);
    });
}