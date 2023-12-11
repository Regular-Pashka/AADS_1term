const arr = [];
let choice;
const getRandom = (max = 100, min = 0) => {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num;
}
// Сортируем в пункте 4 именно элементы каждой строки матрицы, т.е. элементы массивов в массиве.
function fillArr() {
    let arrStrQuantity, arrColumsQuantity, typeOfFill;
    while (isNaN(arrStrQuantity) || arrStrQuantity === "" || isNaN(arrColumsQuantity) || arrColumsQuantity === "") {
        arrStrQuantity = prompt('Input number of strings in array: ');
        arrColumsQuantity = prompt('Input size of all arrays(number of colums): ');
        if (isNaN(arrStrQuantity) || arrStrQuantity === "" || isNaN(arrColumsQuantity) || arrColumsQuantity === "")
            alert("Error: input must be integer");
    }
    for (let i = 0; i < arrStrQuantity; i++) {
        const el = [];
        arr.push(el);
    };
    while(typeOfFill !== "1" && typeOfFill !== "2") {
        typeOfFill = prompt("How you would like to fill each string: by yourself(1) or random(2): ");
        if (typeOfFill !== "1" && typeOfFill !== "2")
            alert("Error: input must be 1 or 2");
    }
    switch (typeOfFill){
        case "1": 
            for (let i = 0; i < arrStrQuantity; i++) {
                for (let j = 0; j < arrColumsQuantity; j++) {
                    let el = prompt(`Input ${j+1} element of ${i+1} string: `); 
                    while (isNaN(el) || el === "") {
                        el = prompt('Error: element must be integer. Input element of array: ');
                    }
                    arr[i].push(Number(el));   
                }
            }
            break;
        case "2":
            let min = 0;
            let max = 0;
            min = Number(prompt("Input left border: "));
            max = Number(prompt("Input right border: "));
            for (let i = 0; i < arrStrQuantity; i++) {
                for (let j = 0; j < arrColumsQuantity; j++) {
                    let el = getRandom(max, min);
                    arr[i].push(el);
                }
            }
            break;
    }
}
fillArr();
// do {
//     choice = prompt("bla bla")
//     switch (choice) {
//         case "1":
//             break;
//         case "2":
//             break;
//         case "3":
//             break;
//         case "4":
//             break;
//         case "5":
//             break;
//     }
// } while (choice !== "6")
// Задание уровня В
// В прямоугольной матрице найти количество строк, элементы которых упорядоченны по возрастанию
// Пути решения: каждую строку записать в новую переменную, отсортировать её быстрой или другой сортировкой, затем сравнить с изначальной строкой, если они равны, то к счётчику добавить одинн
//другая реализация: сравнить каждый элемент друг с другом последовательно, если элемент со старшим индексом меньше чем элемент с младшим индексом добавить к счётчику единицу.
function countSortedStrings() {
    const newArr = arr.slice();
    let count = 0; // всё ещё не понимаю почему код ниже меняет изначальный массив
    for (let i = 0; i < newArr.length; i++) {
        let strClone = newArr[i];
        for (let j = 0; j < strClone.length; j++) {
            for (let k = 0; k < strClone.length; k++) {
                if (strClone[k] > strClone[k+1]) {
                    let buff = strClone[k];
                    strClone[k] = strClone[k+1];
                    strClone[k+1] = buff;
                }
            }
        }
        let equal = 0;
        //comparing each el of arr with other el
        for (let x = 0; x < strClone.length; x++) {
            if (strClone[x] == newArr[i][x])
                equal++;
        }
        if (equal == strClone.length) 
            count++;
    }
    alert(count);
    console.log(newArr);
}
    // let typeOfFill;
    // Ниже условие, модифицировав которое можно добавить опцию создания массива со случайным количеством строк
    // while(typeOfFill !== "1" && typeOfFill !== "2") {
    //     typeOfFill = prompt("How you would like to fill an array: by yourself(1) or random(2): ");
    //     if (typeOfFill !== "1" && typeOfFill !== "2")
    //         alert("Error: input must be 1 or 2");
    // }

countSortedStrings();
console.log(arr);