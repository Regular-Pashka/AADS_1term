let str = "";
let choice;
let substr;
let bmStart, bmEnd, bmTime, innerStrSearchStart, innerStrSearchEnd, innerStrSearchTime, kmpEnd, kmpStart, kmpTime, linStrSearchEnd, linStrSearchStart, linStrSearchTime;
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
            linStrSearchStart = Date.now();
            let result = linearStrSearch(str, substr)
            linStrSearchEnd = Date.now();
            linStrSearchTime = linStrSearchEnd - linStrSearchStart;
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
            kmpStart = Date.now();
            let kmpResult = kmpStrSearch(str, substr);
            kmpEnd = Date.now();
            kmpTime = kmpEnd - kmpStart;
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
            bmStart = Date.now();
            let bmResult = bmSubstrSearch(str, substr);
            bmEnd = Date.now();
            bmTime = bmEnd - bmStart;
            if (bmResult === -1) {
                alert(`Подстрока ${substr} не найдена в строке ${str}`);
            } else {
                alert(`Подстрока ${substr} найдена в строке ${str} начиная с индекса ${bmResult}`);
            };
            break;
        case "6":
            innerStrSearchStart = Date.now();
            let innerInd = str.indexOf(substr);
            innerStrSearchEnd = Date.now();
            innerStrSearchTime = innerStrSearchEnd - innerStrSearchStart;
            if (innerInd === -1) {
                alert(`Подстрока ${substr} не найдена в строке ${str}`);
            } else {
                alert(`Подстрока ${substr} найдена в строке ${str} начиная с индекса ${innerInd}`);
            };
            
            break;
        case "7":
            alert(`Сравнение времени алгоритмов поиска:\n1.Поиск подстроки методом последовательного доступа ${linStrSearchTime} ms\n2.Поиск подстроки методом Кнута-Морриса-Пратта ${kmpTime}ms\n3.Поиск подстроки упрощенным методом Бойера-Мура ${bmTime} ms\n4.Поиск подстроки встроенной функцией ${innerStrSearchTime} ms`);
            break;
        case "8":
            let counter = 0;
            //Task B : подсчитать количество регулярных слов, содержащих хотя бы две одинаковые буквы. Напечатать все слова, имеющие одну цифру, удалив из таких слов все арифметические знаки.
            let wordsKit = str.split(/_|\.|,|;|:|\\n|\\t|\!|\?/).filter(word => word !== "");
            alert(wordsKit);
            console.log(wordsKit);
            //подсчитать колво регулярных слов содержащих хотя бы две одинаковые буквы
            wordsKit.forEach( word => {
                if (word.match(/^[A-Z]+$/) !== null) { //проверка на все большие лат буквы
                    let duplicates = {}; //в объект добавляем каждую букву как ключ и считаем количество её появлений как значение.
                    let letter;
                    for (let i = 0; i < word.length; i++) {
                        letter = word[i];
                        if (duplicates[letter]) {
                            duplicates[letter]++;
                        } else {
                            duplicates[letter] = 1;
                        }
                        if (duplicates[letter] >= 2) {
                            counter++;
                            break;
                        }
                    }
                };
            });
            console.log(`Количество регулярных слов с хотя бы двумя равными буквами: ${counter}`);
            break;
    }
} while (choice !== "9")

//Задачи: переменные времени объявить глобально в начале файла. Сделать задание В.