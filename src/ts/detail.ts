async function renderDetails(): Promise<void> {
	const detail: Element | null = document.querySelector('.detail');
	const countryName: string = location.hash.substring(1);

	if (countryName != '' && detail) {
		const country: Country | null = await Api.getCountryByname(countryName);
		detail.innerHTML = `
      <div class="detail__image"> <img src="${country?.flag}" alt="flag"></div>
      <div class="detail__body">
        <h2 class="detail__title">${country?.name}</h2>
        <div class="detail__content">
          <p><span class="text--semibold">Native Name: </span>${country?.nativeName}</p>
          <p><span class="text--semibold">Population: </span>${formatNumbers(
					country?.population
				)}</p>
          <p><span class="text--semibold">Region: </span>${country?.region}</p>
          <p><span class="text--semibold">Sub Region: </span>${country?.subRegion}</p>
          <p><span class="text--semibold">Capital: </span>${country?.capital}</p>
          <p><span class="text--semibold">Top Level Domain: </span>${
					country?.topLevelDomain[0]
				}</p>
          <p><span class="text--semibold">Currencies: </span>${country?.currencies[0].name}</p>
          <p><span class="text--semibold">Language: </span>${country?.languages.map(
					(language) => {
						return `${language.name}, `;
					}
				)}</p>
        </div>
        <div class="detail__footer">
          <h3 class="detail__footer-title">Border Countries:</h3>
          <div class="detail__border">
            ${country?.borders
					.map((border) => {
						return `<button class="button" type="button">${border}</button>`;
					})
					.join('')}
          </div>
        </div>
      </div>
    `;
	}
}
