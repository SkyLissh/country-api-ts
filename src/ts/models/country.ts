class Country {
	name: string;
	nativeName: string;
	population: number;
	region: string;
	subRegion: string;
	capital: string;
	topLevelDomain: string[];
	currencies: Currencies[];
	languages: Languages[];
	borders: string[];
	flag: string;

	constructor(
		name: string,
		nativeName: string,
		population: number,
		region: string,
		subRegion: string,
		capital: string,
		topLevelDomain: string[],
		currencies: Currencies[],
		languages: Languages[],
		borders: string[],
		flag: string
	) {
		this.name = name;
		this.nativeName = nativeName;
		this.population = population;
		this.region = region;
		this.subRegion = subRegion;
		this.capital = capital;
		this.topLevelDomain = topLevelDomain;
		this.currencies = currencies;
		this.languages = languages;
		this.borders = borders;
		this.flag = flag;
	}
}

class Currencies {
	code: string;
	name: string;
	symbol: string;

	constructor(code: string, name: string, symbol: string) {
		this.code = code;
		(this.name = name), (this.symbol = symbol);
	}
}

class Languages {
	name: string;
	nativeName: string;

	constructor(name: string, nativeName: string) {
		this.name = name;
		this.nativeName = nativeName;
	}
}
