/// <reference path="./models/country.ts"/>
/// <reference path="./api.ts"/>
/// <reference path="./theme.ts"/>

async function main(): Promise<void> {
	const countrySelected: HTMLSelectElement | null = document.querySelector(
		'.country__selected'
	);
	const searchInput: HTMLInputElement | null = document.querySelector('#search');

	let countries: Country[] | null = await Api.getAllCountries();

	Theme.setTheme();

	renderCountries(countries);

	countrySelected?.addEventListener(
		'change',
		async (): Promise<void> => {
			const cardContainer: Element | null = document.querySelector('.card__container');
			cardContainer?.remove();
			countries = await Api.getCountriesByRegion(countrySelected.value);
			renderCountries(countries);
		}
	);

	searchInput?.addEventListener('input', searchCountry);

	renderDetails();

	Theme.toggleTheme();
}

document.addEventListener('DOMContentLoaded', (): void => {
	main();
});

async function renderCountries(countries: Country[] | null): Promise<void> {
	const mainContent: Element | null = document.querySelector('#main-content');

	const cardContainer: Element = document.createElement('section');
	cardContainer.classList.add('card__container');
	mainContent?.appendChild(cardContainer);

	if (countries) {
		countries.forEach((country) => {
			cardContainer?.appendChild(createCard(country));
		});
	} else console.log('No Data');
}

// Searcher
function searchCountry(this: HTMLInputElement): void {
	const regExp: RegExp = new RegExp(this.value, 'i');
	const countryCards: NodeListOf<Element> = document.querySelectorAll('.card');

	countryCards.forEach((card: Element) => {
		card.classList.add('hidden');
		const countryName: string | null = card.childNodes[1].childNodes[0].textContent;

		if (countryName?.replace(/\s/g, ' ').search(regExp) != -1) {
			card.classList.remove('hidden');
		}
	});
}

function createCard(country: Country): Element {
	const flag: HTMLImageElement = document.createElement('img');
	flag.src = country.flag;
	flag.alt = 'flag';

	const cardImage: Element = document.createElement('div');
	cardImage.classList.add('card__image');
	cardImage.appendChild(flag);

	const population: Element = document.createElement('p');
	population.innerHTML = `<span class="text--semibold">Population: </span>${formatNumbers(
		country.population
	)}`;

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

	card.addEventListener('click', (): void => {
		window.location.href = `/details.html#${country.name.toLowerCase()}`;
	});

	return card;
}

function formatNumbers(x: number | undefined): string | undefined {
	return x?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
