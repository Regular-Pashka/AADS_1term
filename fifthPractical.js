let str = "";
let choice;
let substr;
function getRandomChar(min, max) {
    const randomCharCode = Math.floor(Math.random()*(max - min) + min);
    return String.fromCharCode(randomCharCode);
}
function generateRandomStr(strLength) {
    const minAscii = 48;
    const maxAscii = 122;
    let randomStr = "";
    for (let i = 0; i < strLength; i++) {
        randomStr += getRandomChar(minAscii, maxAscii);
    }
    return randomStr;
}
function strFill(someStr) {
    let typeOfFill;
    while(typeOfFill !== "1" && typeOfFill !== "2") {
        typeOfFill = prompt("How you would like to fill string: by yourself(1) or random(2): ");
        if (typeOfFill !== "1" && typeOfFill !== "2")
            alert("Error: input must be 1 or 2");
    }
    if (typeOfFill == "1") {
        someStr = prompt("Введите строку");
        return someStr;
    } else {
        strLength = Number(prompt("Введите количество элементов строки:"));
        someStr = generateRandomStr(strLength);
        return someStr;
    }
}
function linearStrSearch(str, substr) {
    if (substr.length > str.length) return -1;
    let potentialSubstr;
    for (let i = 0; i < str.length - substr.length; i++) {
        potentialSubstr = "";
        for (let j = 0; j < substr.length; j++) {
            potentialSubstr += str[i+j];
        }
        if (potentialSubstr === substr) {
            return `Значение ${substr} в строке ${str} найдено. Это подстрока начинается с индекса ${i} до ${i + (substr.length - 1)} включительно`;
        }
    }
    return `Подстрока ${substr} в строке ${str} не найденa`
}
do {
    choice = prompt("Меню\n1.Заполнить строку.\n2.Вывести строку на экран\n3.Поиск подстроки методом последовательного доступа\n4.Поиск подстроки методом Кнута-Морриса-Пратта\n5.Поиск подстроки упрощенным методом Бойера-Мура.\n6.Поиск подстроки встроенной функцией.\n7.Сравнение времени работы методов.\n8.Решение задачи уровня В\n9.Exit");
    switch (choice) {
        case "1":
            str = strFill(str);
            break;
        case "2":
            alert(str);
            substr = prompt("Введите искомую подстроку");
            break;
        case "3":
            let linStrSearchStart = Date.now();
            let result = linearStrSearch(str, substr)
            let linStrSearchEnd = Date.now();
            let linStrSearchTime = linStrSearchEnd - linStrSearchStart;
            alert(result);
            break;
        case "4":
            const prefix = (str) => {
                const n = str.length;
                const p = Array(n).fill(0);
                let i = 1, j = 0;
                while (i < str.length) {
                    if (str[i] === str[j]) {
                        p[i] = j + 1;
                        i++;
                        j++;
                    } else {
                        if (j === 0) {
                            p[i] = 0;
                            i++;
                        } else {
                            j = p[j - 1];
                        }
                    }
                }
                return p;
            }
            const kmpStrSearch = (str, searchString) => {
                const searchStringPrefix = prefix(searchString);
                let i = 0, j = 0;
                while (i < str.length) {
                    if (str[i] === searchString[j]) {
                        j++;
                        i++;
                        if (j === searchString.length) {
                            return (i - searchString.length);
                        }
                    } else {
                        if (j > 0) {
                            j = searchStringPrefix[j - 1];
                        } else {
                            i++;
                        }
                    }
                }
                if (i === str.length && j !== searchString.length) {
                    return -1;
                }
            }
            let kmpStart = Date.now();
            let kmpResult = kmpStrSearch(str, substr);
            let kmpEnd = Date.now();
            let kmpTime = kmpEnd - kmpStart;
            if (kmpResult === -1) {
                alert(`Подстрока ${substr} не найдена в строке ${str}`);
            } else {
                alert(`Подстрока ${substr} найдена в строке ${str} начиная с индекса ${kmpResult}`);
            };
            break;
        case "5":
            function bmSubstrSearch(str, substr) {
                const strLength = str.length;
                const substrLength = substr.length;
                if (substrLength === 0) {
                    return "Вернитесь на пункт два и введите не пустую строку";
                }
                //Создаём таблицу смещений для каждого сивола в подстроке
                const badCharTable = {};
                for (let i = 0; i < substrLength-1; i++) {
                    badCharTable[substr[i]] = substrLength - 1 - i;
                }
                let i = substrLength - 1;//ind of char in str
                let j = substrLength - 1;//ind of char in substr
                while (i < strLength) {
                    if (str[i] === substr[j]) {
                        if (j === 0) {
                            return i;
                        }
                        i--;
                        j--;
                    } else {
                        const badCharShift = badCharTable[str[i]] || substrLength;
                        i += Math.max(badCharShift, substrLength -1 - j + 1);
                        j = substrLength - 1;
                    }
                }
                return -1;
            }
            let bmStart = Date.now();
            let bmResult = bmSubstrSearch(str, substr);
            let bmEnd = Date.now();
            let bmTime = bmEnd - bmStart;
            if (bmResult === -1) {
                alert(`Подстрока ${substr} не найдена в строке ${str}`);
            } else {
                alert(`Подстрока ${substr} найдена в строке ${str} начиная с индекса ${bmResult}`);
            };
            break;
        case "6":
            let innerStrSearchStart = Date.now();
            let innerInd = str.indexOf(substr);
            let innerStrSearchEnd = Date.now();
            let innerStrSearchTime = innerStrSearchEnd - innerStrSearchStart;
            if (innerInd === -1) {
                alert(`Подстрока ${substr} не найдена в строке ${str}`);
            } else {
                alert(`Подстрока ${substr} найдена в строке ${str} начиная с индекса ${innerInd}`);
            };
            
            break;
        case "7":
            alert(`Сравнение времени алгоритмов поиска:\n1. 1.Поиск подстроки методом последовательного доступа ${linStrSearchTime}\n2.Поиск подстроки методом Кнута-Морриса-Пратта ${kmpTime}\n3.Поиск подстроки упрощенным методом Бойера-Мура ${bmTime}\n4.Поиск подстроки встроенной функцией ${innerStrSearchTime}`);
            break;
        case "8":
            break;
    }
} while (choice !== "9")

//Задачи: переменные времени объявить глобально в начале файла. Сделать задание В.