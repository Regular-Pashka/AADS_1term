//Пункт 1,2,3
const arr = [];
const getRandom = (max = 100, min = 0) => {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num;
}
function fillArr() {
    let arrL;
    while (isNaN(arrL) || arrL === "") {
        arrL = prompt('Input array size: ');
        if (isNaN(arrL) || arrL === "")
            alert("Error: input must be integer");
    }
    let typeOfFill;
    while(typeOfFill !== "1" && typeOfFill !== "2") {
        typeOfFill = prompt("How you would like to fill an array: by yourself(1) or random(2): ");
        if (typeOfFill !== "1" && typeOfFill !== "2")
            alert("Error: input must be 1 or 2");
    }
    switch (typeOfFill){
        case "1": 
            for (let i = 0; i < arrL; i++) {
                let el = prompt('Input element of array: ');
                while (isNaN(el) || el === "") {
                    el = prompt('Error: element must be integer. Input element of array: ');
                }
                arr.push(Number(el));
            };
            break;
        case "2": // добавить границы ввода пользователем: от -100 до 100 значения генерируются
            let min = 0;
            let max = 0;
            min = Number(prompt("Input left border: "));
            max = Number(prompt("Input right border: "));
            for (let i = 0; i < arrL; i++) {
                let el = getRandom(max, min);
                arr.push(el);
            }
            break;
    }
};
fillArr();
// Пункт 4
let bTime, qTime, jsTime;
//4.1 bubble sort
let choice;
do {
    choice = prompt("Menu(input integer): \n1 - Bubble sort \n2 - Quicksort \n3 - JavaScript sort \n4 - Time consumption of each sort \n5 - B level task \n6 - Exit");
    switch (choice) { 
        case "1":
            const bArr = arr.slice();
            const bStart = Date.now();
            for (let i = 0; i < bArr.length; i++) {
                for (let j = 0; j < bArr.length; j++) {
                    if (bArr[j] > bArr[j+1]) {
                        let buff = bArr[j];
                        bArr[j] = bArr[j+1];
                        bArr[j+1] = buff;
                    }
                }
            }
            const bEnd = Date.now();
            bTime = bEnd - bStart;
            alert(arr);
            alert(bArr);
            break;
        case "2": // 1.2 Quicksort iteration realisation of quicksort
            const qArr = arr.slice(); //поискать аналог копи оф в джаве
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
            const qResult = quickSort(qArr);
            const qEnd = Date.now();
            qTime = qEnd - qStart;
            alert(qResult);
            break;
        case "3":
            const jsArr = arr;
            const jsStart = Date.now();
            const jsResult = jsArr.sort((a, b) => a - b);
            const jsEnd = Date.now();
            jsTime = jsEnd -jsStart;
            alert(jsResult);
            break;
        case "4":
            console.log(`Bubble sort time consumption: ${bTime}\nQuick sort time consumption: ${qTime}\nJS sort time consumption: ${jsTime}\n`);
            break;
        case "5":
            const ansArr = [];
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[i] === arr[j] ** 2) {
                        ansArr.push(arr[i])
                    }
                }
            }//проверить квадрат 
            alert(ansArr.length);
            break;
    }
} while (choice !== "6")
console.log(bTime);
// 1.2 Quicksort other, without return
    qqArr = [4,2,2,3,5,33,343,342,654,2,1,2223,991, 1100];
