class Theme {
	static toggleButton: Element | null = document.querySelector('#theme-toggle');
	static body: Element | null = document.querySelector('body');

	static toggleTheme(): void {
		this.toggleButton?.addEventListener('click', (): void => {
			if (this.body?.classList.contains('theme--light')) {
				this.body.classList.remove('theme--light');
				this.body.classList.add('theme--dark');

				localStorage.setItem('theme', 'dark');
			} else if (this.body?.classList.contains('theme--dark')) {
				this.body.classList.remove('theme--dark');
				this.body.classList.add('theme--light');

				localStorage.setItem('theme', 'light');
			}
		});
	}

	static setTheme(): void {
		const theme: string | null = localStorage.getItem('theme');

		if (theme) {
			theme === 'light'
				? this.body?.classList.add('theme--light')
				: this.body?.classList.add('theme--dark');
		} else {
			this.body?.classList.add('theme--light');
		}
	}
}
