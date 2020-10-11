/// <reference path="./models/country.ts"/>

function main(): void {
	renderCountries();
}

document.addEventListener('DOMContentLoaded', (): void => {
	main();
});

async function getAllCountries(): Promise<Country[] | null> {
	try {
		const res: Response = await fetch('https://restcountries.eu/rest/v2/all');
		return (await res.json()) as Country[];
	} catch (error) {
		console.error('Error: ', error);
		return null;
	}
}

async function renderCountries(): Promise<void> {
	const cardContainer: Element | null = document.querySelector('.card__container');
	const countries = await getAllCountries();

	console.log('works');

	if (cardContainer && countries) {
		countries.forEach((country) => {
			cardContainer.appendChild(createCard(country));
		});
	} else if (!cardContainer) console.log('No Data');
}

function createCard(country: Country): Element {
	const flag: HTMLImageElement = document.createElement('img');
	flag.src = country.flag;
	flag.alt = 'flag';

	const cardImage: Element = document.createElement('div');
	cardImage.classList.add('card__image');
	cardImage.appendChild(flag);

	const population: Element = document.createElement('p');
	population.innerHTML = `<span class="text--semibold">Population: </span>${country.population}`;

	const region: Element = document.createElement('p');
	region.innerHTML = `<span class="text--semibold">Region: </span>${country.region}`;

	const capital: Element = document.createElement('p');
	capital.innerHTML = `<span class="text--semibold">Capital: </span>${country.capital}`;

	const cardTitle: HTMLHeadElement = document.createElement('h2');
	cardTitle.classList.add('card__title');
	cardTitle.innerText = `${country.name}`;

	const cardContent: Element = document.createElement('div');
	cardContent.classList.add('card__content');
	cardContent.append(population, region, capital);

	const cardBody: Element = document.createElement('div');
	cardBody.classList.add('card__body');
	cardBody.append(cardTitle, cardContent);

	const card: Element = document.createElement('div');
	card.classList.add('card');
	card.append(cardImage, cardBody);

	return card;
}
