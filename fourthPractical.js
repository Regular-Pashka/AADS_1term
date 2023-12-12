const arr = [];
let choice, bTime, qTime, jsTime, arrString, searchValue, sPosStart, sPosEnd, sPosTime, sBinStart, sBinEnd, sBinTime, sFibStart, sFibEnd, sFibTime, sInterStart, sInterEnd, sInterTime, sInnerFuncStart, sInnerFuncEnd, sInnerFuncTime;
const getRandom = (max = 100, min = 0) => {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num;
}
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

do {
    choice = prompt("Task 4\nMenu(input integer): \n1 - Bubble sort \n2 - Quicksort \n3 - JavaScript sort \n4 - Time consumption of each sort \n5 - B level task \n6 - Exit");
    switch (choice) {
        case "1":
            const bArr = JSON.parse(JSON.stringify(arr));
            const bStart = Date.now();
            for (let k = 0; k < bArr.length; k++) {
                arrString = bArr[k];
                for (let i = 0; i < arrString.length; i++) {
                    for (let j = 0; j < arrString.length; j++) {
                        if (arrString[j] > arrString[j+1]) {
                            let buff = arrString[j];
                            arrString[j] = arrString[j+1];
                            arrString[j+1] = buff;
                        }
                    }
                }
            }
            const bEnd = Date.now();
            bTime = bEnd - bStart;
            console.log(arr);
            console.log(bArr);
            break;
        case "2":
            const qArr = JSON.parse(JSON.stringify(arr)); //поискать аналог копи оф в джаве
            function quickSort(array) {
                if (array.length <= 1) { //базисная часть рекурсии
                    return array;
                }
                const majorEl = array[0];  //рекурсивная часть
                const leftArr = [];
                const rightArr = [];
                for (let i = 1; i < array.length; i++){
                    array[i] < majorEl ? leftArr.push(array[i]) : rightArr.push(array[i]);
                }
                return [...quickSort(leftArr), majorEl, ...quickSort(rightArr)];
            }
            const qStart = Date.now();
            for (let i = 0; i < qArr.length; i++) {
                qArr[i] = quickSort(qArr[i]);
            }
            const qEnd = Date.now();
            qTime = qEnd - qStart;
            console.log(qArr);
            break;
        case "3":
            console.log("hi");
            const jsArr = JSON.parse(JSON.stringify(arr));
            const jsStart = Date.now();
            const jsResult = jsArr.foreach(strArr => strArr.sort((a, b) => a - b));
            const jsEnd = Date.now();
            jsTime = jsEnd - jsStart;
            console.log("hi");
            console.log(jsArr);
            console.log(jsResult);
            break;
        case "4":
            console.log(`Bubble sort time consumption: ${bTime}\nQuick sort time consumption: ${qTime}\nJS sort time consumption: ${jsTime}\n`);
            break;
        case "5":
            countSortedStrings();
            break;
    }
} while (choice !== "6");

do {
    searchValue = Number(prompt("Введите искомое значение"));
    choice = prompt("Task 5\nMenu(input integer): \n1 - Последовательный поиск \n2 - Бинарный поиск \n3 - Фибоначчиев поиск \n4 - Интерполяционный поиск \n5 - Поиск встроенной функцией \n6 - Сравнение времени алгоритмов поиска \n7 Exit");
    switch (choice) {
        //Последовательный поиск начало
        case "1":
            function linSearch(){
                let marker = 0;
                for (let j = 0; j < arr.length; j++) {
                    for (let i = 0; i < arr[j].length; i++) {
                        if (arr[j][i] === searchValue) {
                            console.log(`Искомое значение ${searchValue} найдено в массиве ${arr}. Это элемент ${j+1}-й строки ${i+1}-ого столбца`);
                            marker++;
                            break;
                        }
                    }
                    if (marker == 1) {
                        break;
                    }
                }
                if (marker == 0) {
                    console.log(`Искомое значение ${searchValue} не найдено в массиве ${arr}.`)
                }
            }
            sPosStart = Date.now();
            linSearch();
            sPosEnd = Date.now();
            sPosTime = sPosStart - sPosEnd;
            break;
        //Последовательный поиск конец
        case "2":
            function binSearch() {
                let marker = 0;
                let mid, currEl;
                let binArr = JSON.parse(JSON.stringify(arr));
                for (let i = 0; i < arr.length; i++) {
                    let sortedArrStr = binArr[i].sort((a, b) => a - b);
                    let left = 0;
                    let right = sortedArrStr.length - 1;
                    while (left <= right) {
                        mid = Math.floor((left + right) / 2);
                        currEl = sortedArrStr[mid];
                        if (currEl === searchValue) {
                            console.log(`Искомое значение ${searchValue} найдено в массиве ${binArr}. Это элемент ${i+1}-й строки ${mid+1}-ого столбца`);
                            marker++;
                            break;
                        } else if (currEl > searchValue) {
                            right = mid - 1;
                        } else {
                            left = mid + 1;
                        }
                    }
                    if (marker == 1) {
                        break;
                    }
                }
                if (marker == 0) {
                    console.log(`Искомое значение ${searchValue} не найдено в массиве ${binArr}.`)
                }
            }
            sBinStart = Date.now();
            binSearch();
            sBinEnd = Date.now();
            sBinTime = sBinEnd - sBinStart;
            break;
        case "3":
            let fibArr = JSON.parse(JSON.stringify(arr));
            function fibonacci2DSearch(arr, x) {
                let clearStrings = 0;
                for (let i = 0; i < arr.length; i++) {
                    let sortedArrStr = arr[i].sort((a, b) => a - b);
                    let fibMMm2 = 0;  
                    let fibMMm1 = 1;  
                    let fibM = fibMMm2 + fibMMm1; 
                    while (fibM < sortedArrStr.length) {
                        fibMMm2 = fibMMm1;
                        fibMMm1 = fibM;
                        fibM  = fibMMm2 + fibMMm1;
                    }
                    let offset = -1;
                    while (fibM > 1) {
                        let ind = Math.min(offset+fibMMm2, sortedArrStr.length-1);
                        if (sortedArrStr[ind] < x) {
                            fibM  = fibMMm1;
                            fibMMm1 = fibMMm2;
                            fibMMm2 = fibM - fibMMm1;
                            offset = ind;
                        }
                        else if (sortedArrStr[ind] > x) {
                            fibM  = fibMMm2;
                            fibMMm1 = fibMMm1 - fibMMm2;
                            fibMMm2 = fibM - fibMMm1;
                        }
                        else {
                            return `Элемент найден в ${i+1}й строке ${ind+1} столбце`;
                        }
                    }
                    if(fibMMm1 && sortedArrStr[offset+1]==x) return offset+1;
                    clearStrings++;
                }
                if (clearStrings == fibArr.length) {
                    return `В заданном двумерном массиве отстутствует данное число`;
                }
                //цикл прохода по основному массиву
                // for (let i = 0; i < array.length; i++) {
                //     let sortedArrStr = array[i].sort((a, b) => a - b);
                //     for (let j = 0; j < array[i].length; i++) {
                //         if (array[i][fibSequence[j]] > searchValue) {
                //             return fibonacciSearch(array[i].slice(j-1, j))
                //         } else if (array[i][fibSequence[j]] == searchValue) {
                //             console.log(fibArr);
                //             return `Искомое значение ${searchValue} найдено в массиве. Это элемент ${i+1}-й строки ${j+1}-ого столбца`;
                //         }     
                //     }
                // }
                // return -1;
            }
            console.log(fibArr);
            sFibStart = Date.now();
            console.log(fibonacci2DSearch(fibArr, searchValue));
            sFibEnd = Date.now();
            sFibTime = sFibEnd - sFibStart;
            break;
        case "4":
            let interArr = JSON.parse(JSON.stringify(arr));
            function interpolationSearch(arr, x) {
                let low = 0;
                let high = arr.length - 1;
                let mid;
                while (arr[low] <= x && arr[high] >= x) {
                    mid = low + ((x - arr[low]) * (high - low)) / (arr[high] - arr[low]);
                    if (arr[mid] < x) {
                        low = mid + 1;
                    } else if (arr[mid] > x) {
                        high = mid - 1;
                    } else {
                        return mid;
                    }
                }
              
                if (arr[low] === x) {
                    return low;
                } else {
                    return -1;
                }
            }
            for (let i = 0; i < interArr.length; i++) {
                interArr[i].sort((a, b) => a - b);
            }
            let intResult;
            let clearStings;
            sInterStart = Date.now();
            for (let j = 0; j < interArr.length; j++) {
                intResult = interpolationSearch(interArr[j], searchValue);
                if (intResult == -1) {
                    clearStings++
                } else {
                    console.log(`Значение ${searchValue} найдено в ${j+1}й строке ${Math.floor(intResult) + 1} столбца массива`);
                    console.log(interArr);
                    break;
                }
            }
            if (clearStings == interArr.length) {
                console.log("Значение  не найдено в массиве");
            }
            sInterEnd = Date.now();
            sInterTime = sInterEnd - sInterStart;
            break;
        case "5":
            let innerArr = JSON.parse(JSON.stringify(arr));
            let strInd;
            let counter = 0;
            function innerJSSearch() {
                for (let i = 0; i < innerArr.length; i++) {
                    strInd = innerArr[i].indexOf(searchValue);
                    if (strInd !== -1) {
                        console.log(`Значение ${searchValue} найдено в ${i+1}й строке ${strInd+1} столбца массива`);
                        console.log(innerArr);
                        break;
                    } else {
                        counter++;
                    }
                }
                if (counter == innerArr.length) {
                    console.log("Not found");
                }
            }
            sInnerFuncStart = Date.now();
            innerJSSearch();
            sInnerFuncEnd = Date.now();
            sInnerFuncTime = sInnerFuncEnd - sInnerFuncStart;
            break;
        case "6":
            alert(`Сравнение времени алгоритмов поиска:\n1. Последовательный поиск - ${sPosTime}ms\n2.Бинарный поиск - ${sBinTime}ms\n3.Fibonacci Search - ${sFibTime}ms\n4.Interpolation search - ${sInterTime}ms\n5.Inner JS Search ${sInnerFuncTime}ms`);
            break;     
    }
} while (choice !== "7");

// Задание уровня В
// В прямоугольной матрице найти количество строк, элементы которых упорядоченны по возрастанию
// Пути решения: каждую строку записать в новую переменную, отсортировать её быстрой или другой сортировкой, затем сравнить с изначальной строкой, если они равны, то к счётчику добавить одинн
//другая реализация: сравнить каждый элемент друг с другом последовательно, если элемент со старшим индексом меньше чем элемент с младшим индексом добавить к счётчику единицу.
function countSortedStrings() {
    let count = 0; 
    for (let i = 0; i < arr.length; i++) {
        let strClone = arr[i].slice();
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
            if (strClone[x] == arr[i][x])
                equal++;
        }
        if (equal == strClone.length) 
            count++;
    }
    alert(count);
};
    // let typeOfFill;
    // Ниже условие, модифицировав которое можно добавить опцию создания массива со случайным количеством строк
    // while(typeOfFill !== "1" && typeOfFill !== "2") {
    //     typeOfFill = prompt("How you would like to fill an array: by yourself(1) or random(2): ");
    //     if (typeOfFill !== "1" && typeOfFill !== "2")
    //         alert("Error: input must be 1 or 2");
    // 