// // Задача:
// // дан односвязный список 
// let list = {
//     value: 1,
//     next: {
//         value: 2,
//         next: {
//             value: 3,
//             next: {
//                 value: 4,
//                 next: null
//             }
//         }       
//     }
// };
// // Напишите функцию принтлист(лист) кооторая выводит элементы списка по одному. Реализуйте
// // два варианта решения используя цикл и через рекурсию как лучше с рекурсией или без.

// //Solution 

// function printListLoop(obj) {
//     for (let key in obj) {
//         if (typeof(obj[key]) === 'object') {
//             for (let key2 in obj[key]){
//                 if (typeof(obj[key][key2]) === 'object') {
//                     for (let key3 in obj[key][key2]){
//                         if (typeof(obj[key][key2][key3]) === 'object') {
//                             for (let key4 in obj[key][key2][key3]){
//                                 if (typeof(obj[key][key2][key3][key4]) === 'number') {
//                                     console.log(obj[key][key2][key3][key4])
//                                 }
//                             }
//                         } else {
//                             console.log(obj[key][key2][key3]);
//                         }
//                     }
//                 } else {
//                     console.log(obj[key][key2]);
//                 }    
//             }
//         } else {
//             console.log(obj[key]);
//         }
//     }
// // };
// // printListLoop(list);

// function printListRecursion(list) {
//     console.log(list.value);
//     if (list['next']) {
//         printListRecursion(list['next']);
//     }
// }
// printListRecursion(list);

// console.log(Number('100l'));
let arr = [1, 4, 22, 333, 423, 534, 643, 711, 712, 811];
let fibArr = JSON.parse(JSON.stringify(arr));
            let fibSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];
            function fibonacciSearch(arr) {
                //цикл прохода по основному массиву
                for (let i = 0; i < fibArr.length; i++) {
                    let sortedArrStr = fibArr[i].sort((a, b) => a - b);
                    for (let j = 0; j < fibArr[i].length; i++) {
                        if (fibArr[i][fibSequence[j]] > searchValue) {
                            return fibonacciSearch(arr[i].slice(j-1, j))
                        } else if (fibArr[i][fibSequence[j]] == searchValue) {
                            return `Искомое значение ${searchValue} найдено в массиве ${binArr}. Это элемент ${i+1}-й строки ${mid+1}-ого столбца`;
                        }     
                    }
                }
                return -1;
            }