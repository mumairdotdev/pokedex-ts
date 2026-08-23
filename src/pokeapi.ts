import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private readonly cache: Cache<any>;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>("locations");
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.cache.add("locations", data);
      return data;
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(`location:${locationName}`);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch location: ${response.statusText}`);
      }

      const location = await response.json();
      this.cache.add(`location:${locationName}`, location);
        return location;
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
    
  }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        const cached = this.cache.get<Pokemon>(`pokemon:${pokemonName}`);
        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch Pokemon: ${response.statusText}`);
            }

            const pokemon = await response.json();
            this.cache.add<Pokemon>(url, pokemon);
            return pokemon;
        } catch (error) {
            console.error("Error fetching Pokemon:", error);
            throw error;
        }
    }
}

export type Pokemon = {
    name: string;
    base_experience: number;
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: Array<{
        name: string;
        url: string;
    }>;
};

export type Location = {
    pokemon_encounters: Array<{
        pokemon: {
            name: string;
            url: string;
        };
    }>;
};