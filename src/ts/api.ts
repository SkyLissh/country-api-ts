class Api {
	constructor() {}

	static async getAllCountries(): Promise<Country[] | null> {
		try {
			const res: Response = await fetch('https://restcountries.eu/rest/v2/all');
			return (await res.json()) as Country[];
		} catch (error) {
			console.error('Error: ', error);
			return null;
		}
	}

	static async getCountriesByRegion(region: string): Promise<Country[] | null> {
		try {
			const res: Response = await fetch(
				`https://restcountries.eu/rest/v2/region/${region}`
			);
			return (await res.json()) as Country[];
		} catch (error) {
			console.error('Error: ', error);
			return null;
		}
	}

	static async getCountryByname(name: string): Promise<Country | null> {
		try {
			const res: Response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
			const countries: Country[] = await res.json();
			return countries[0];
		} catch (error) {
			console.error('Error: ', error);
			return null;
		}
	}
}
