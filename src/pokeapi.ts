export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const response = await fetch(pageURL || `${PokeAPI.baseURL}/location-area`);
    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
    return response.json();
  }
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