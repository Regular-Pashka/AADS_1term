const arr = [];
function fillArr() {
    let arrL = prompt("Input array size: ");
    for (let i = 0; i < arrL; i++) {
        let el = prompt('Input element of array: ');
        while (isNaN(el) || el === "") {
            el = prompt('Error: element must be integer. Input element of array: ');
        }
        arr.push(Number(el));
    }    
}
fillArr();
const result = [];
for (let i = 0; i < arr.length; i++) {
    const numL = (Math.floor(Math.log10(arr[i])) + 1); //считаем количество разрядов
    let elem = arr[i];
    
    if (numL % 2 == 0) {
        while (Math.floor(elem/10) >= 1) {
            if (elem % 10 == 3) {
                const n = numL / 2;
                if (arr[i] % Math.pow(10, n) == Math.floor(arr[i]/Math.pow(10,n))) {
                    result.push(arr[i]);
                }
                break;
            } else {
                elem = Math.floor(elem/10);
            }
        }  
    }; // остаток от деления на 10 сравниваем с исхожной цифрой остаток должен быть равен исходному числу если не равен, то оставшуюся целую часть снова делим на 10, если остаток опять не равен, снова делим целую часть на 10, и так, пока целая часть больше или равна единице
}
console.log(result);
// console.log(result.length);
// const arrFiltered = arr.filter( (number) => {
    
// //Решение через строки    
//     //if (number.length % 2 == 0) {
//         // const firstHalf = number.slice(0, number.length / 2); // считаем колво разрядов, если чётное - делим на 2, т.е. двойка это степень 10ти. потом исходное число делим на 10 в степени 2, если целая часть от деления равна дробной части - числа равно
//         // const secHalf = number.slice(number.length / 2); // остаток от деления на 10 последний разряд равен тройки или нет и так ещё 2) количество разрядов нужно посмотреть, т.е. если не чётный выкидываем, поделим на 2 ЧИСЛО 4343 4 РАЗРЯДА /2  степень дестяки если целая часть от деления на 10 такая же как остаток 
//         // if (firstHalf.search(/3/) !== -1 && secHalf.search(/3/) !== -1 && firstHalf === secHalf) {
//         //      return true;
//         // }
//     }
// })
// console.log(arrFiltered);

// console.log(arr);