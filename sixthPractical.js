// ВАРИАНТ 9 - СОБАКА

//1.1 Реализовать в Java(JavaScript) класс в соответствии со своим вариантом.
// Предусмотреть не менее 3 параметров, одним из которых является
// объект другого класса, 2 методов и 2 конструкторов (включая
// конструктор по умолчанию). Предусмотреть счетчик экземпляров
// классов.
// Предусмотреть для классов, являющихся полями не менее 2
// параметров, 2 методов и 2 конструкторов (включая конструктор по
// умолчанию).
class Dog {
	static counter = 0; // счетчик экземпляров класса

	constructor(name, breed, owner, age) {
		this.name = name;
		this.breed = breed; // порода
		this.owner = owner;
		this.age = age;
		Dog.counter++;
	}
	bark() {
		console.log(`${this.name} лает!`);
	}
	eat() {
		console.log(`${this.name} ест корм.`);
	}
	explode() {
		console.log(`${this.name} внезапно взорвался!${this.owner.name} приобрёл ПТСР.`)
	}
}

class Owner {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	playWithDog(dog) {
		console.log(`${this.name} кинул кость ${dog.name}у.`);
	}
	feedDog(dog) {
		console.log(`${this.name} накормил ${dog.name}а.`);
	}
}

// 2 Реализовать хранение объектов классов в виде списка.
// Предусмотреть следующие операции над списком:
// 1) Добавления элемента (доп. нескольких элементов) в конец или в
// определенное место списка;
// 2) Удаление элемента (доп. нескольких элементов) в конце или в
// определенном месте списка;
// 3) Изменение определенного элемента списка;
// 4) Поиск и вывод номера и информации введенного элемента по
// разным полям;
// 5) Вывод на экран всех объектов списка или определенного
// элемента списка;
// 6) Вывод числа элементов в списке.
// Массив для хранения объектов класса Dog
const dogs = [];

// Функция для добавления новой собаки в конец массива
function addDog() {
	const dogQuant = Number(prompt("Enter the dog's quantity to add:"));
	for (let i = 1; i <= dogQuant; i++) {
		const dogName = prompt(`Enter the ${i} dog's name:`);
		const breed = prompt(`Enter the ${i} dog's breed:`);
		const ownerName = prompt(`Enter the ${i} dog's owner name:`);
		const ownerAge = prompt(`Enter the ${i} dog's owner age:`);
		const owner = new Owner(ownerName, ownerAge);
		const dog = new Dog(dogName, breed, owner);
		let listPos;
		listPos = prompt("Where would you like to add dog: position/end?");
			if (listPos === "end") {
				dogs.push(dog);
				console.log("Dog added successfully!");
			} else if (listPos >= 0 && listPos < dogs.length){
				dogs.splice(listPos, 0, dog);
				console.log("Dog added successfully!");
			} else {
				console.log("Invalid index!");
			}
	}
	console.log("Dog added successfully!");
}

// Функция для удаления собаки по индексу
function removeDog() {
	const index = prompt("Enter the index of the dogs to remove or type deleteLastOne to remove last dog:");
	const dogsQuant = Number(prompt("Enter the dog's quantity to remove:"));
	if (index === "deleteLastOne") {
		for (let i = 0; i < dogsQuant; i++) {
			dogs.pop();
		}
		//dogs.pop(-dogsQuant);
		console.log("Dog removed successfully!");
	} else if (index >= 0 && index < dogs.length){
		dogs.splice(index, dogsQuant);
		console.log("Dog removed successfully!");
	} else {
		console.log("Invalid index!");

	}
}

// Функция для изменения информации о собаке по индексу
function updateDog() {
	const index = prompt("Enter the index of the dog to update:");
	if (index >= 0 && index < dogs.length) {
		// const change = prompt("What would you like to change: name/breed/owner/nevermind?");
		let change;
		do {
			change = prompt("What would you like to change: name/breed/owner? If you do not want to change anything type: nevermind");
			if (change == "name") {
				const name = prompt("Enter the new name for a dog:");
				dogs[index].name = name;
			}
			if (change == "breed") {
				const breed = prompt("Enter the new breed for a dog:");	
				dogs[index].breed = breed;
			}
			if (change == "owner") {
				const owner = prompt("Enter the new owner:");
				dogs[index].owner.name = owner;			}
		} while (change !== "nevermind")
		// const name = prompt("Enter the new name for a dog:");
		// const breed = prompt("Enter the new breed for a dog:");
		// const owner = prompt("Enter the new owner:");
		// dogs[index].name = name;
		// dogs[index].breed = breed;
		// dogs[index].owner.name = owner;
		console.log("Dog updated successfully!");
	} else {
		console.log("Invalid index!");
	}
}

// Функция для поиска и вывода информации о собаке по разным полям
function searchDog() {
	const field = prompt("Enter the field to search by (name/breed/owner):");
	const value = prompt(`Enter the ${field} to search for:`);
	const foundDogs = dogs.filter(dog => dog[field] === value || dog[field].name === value);
	if (foundDogs.length > 0) {
		console.log("Found dogs:");
		foundDogs.forEach((dog, index) => {
			console.log(`[${index}] Name: ${dog.name}, Breed: ${dog.breed}, Owner: ${dog.owner.name}`);
		});
	} else {
		console.log("No dogs found!");
	}
}

// Функция для вывода всех собак или определенной собаки по индексу
function displayDogs() {
	const index = prompt("Enter the index of the dog to display (or leave empty to display all):");
	if (dogs.length === 0) {
		console.log("There is no dogs!");
	} else {
		if (index) {
			if (index >= 0 && index < dogs.length) {
				const dog = dogs[index];
				console.log(`Name: ${dog.name}, Breed: ${dog.breed}, Owner: ${dog.owner.name}`);
			} else {
				console.log("Invalid index!");
			}
		} else {
			console.log("All dogs:");
			dogs.forEach((dog, index) => {
				console.log(`[${index}] Name: ${dog.name}, Breed: ${dog.breed}, Owner: ${dog.owner.name}`);
			});
		}
	}

}

// Функция для вывода числа собак в массиве
function displayCount() {
	console.log(`Total dogs: ${dogs.length}`);
}
function main() {
	let choice;

	do {
		choice = prompt(`Menu:
  1. Add a dog
  2. Remove a dog
  3. Update a dog
  4. Search for a dog
  5. Display dogs
  6. Display count
  7. Dog orders
  8. Owner actions
  0. Exit
  Enter your choice:`);

		switch (choice) {
			case "1":
				addDog();
				break;
			case "2":
				removeDog();
				break;
			case "3":
				updateDog();
				break;
			case "4":
				searchDog();
				break;
			case "5":
				displayDogs();
				break;
			case "6":
				displayCount();
				break;
			case "7":
				let order = prompt("Order to the dog: bark/eat/explode");
				const index = prompt("Enter the index of the dog to do the order:");
				if (index >= 0 && index < dogs.length) {
					dogs[index][order]();
				} else {
					console.log("Invalid index!");
				}
				break;
			case "8":
				let action = prompt("Owner action: playWithDog/feedDog");
				const ind = prompt("Enter the index of the dog which owner you want to take action:");
				if (ind >= 0 && ind < dogs.length) {
					dogs[ind].owner[action](dogs[ind]);
				} else {
					console.log("Invalid index!");
				}
				break;
			case "0":
				console.log("Exiting...");
				break;
			default:
				console.log("Invalid choice!");
				break;
		}
	} while (choice !== "0");
}
main();
 // нужно чтобы пользователь мог выбрать что обновлять
 // добавление собак с определённого индекса либо в конец 
 // найти препода показать ему отчёты в четверг с двух до пяти