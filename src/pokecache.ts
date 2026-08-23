type CacheEntry<T> = {
    createdAt: number;
    data: T;
}

export class Cache<T> {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: ReturnType<typeof setInterval> | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReaping();
    }

    #reap() {
        for (const [key, entry] of this.#cache.entries()) {
            if (Date.now() - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReaping() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap()
        }, this.#interval);
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    add<T>(key: string, val: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            data: val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (entry !== undefined) {
            return entry.data as T;
        }
        return undefined;
    }
}