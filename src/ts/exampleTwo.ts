class Car {
	model: string;

	constructor(model: string) {
		this.model = model;
	}
}

const car = new Car('Toyota');
console.log(car.model);
