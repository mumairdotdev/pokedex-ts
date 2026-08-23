import { startREPL } from './repl.js';
import { initState } from './state.js';

async function main() {
    const state = initState(5 * 60 * 1000); // Cache interval of 5 minutes
    await startREPL(state);
}

main();