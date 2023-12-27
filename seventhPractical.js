// вывод числа в экспоненциальном виде в десятичной СС
function exponentNum(inNum) {
	let f = true;
	let sign = parseFloat(inNum) >= 0 ? "" : "-";
	inNum = Math.abs(parseFloat(inNum)).toString();
	let isNumBiggerThanOne = parseFloat(inNum) >= 1;
	let mantissa = "";

	let nonSignificantSymbolsCounter = 0;
	for (let i = 0; i < inNum.length; i++) {
		if (inNum.charAt(i) === "0") nonSignificantSymbolsCounter++;
		else if (inNum.charAt(i) === ".") {
			nonSignificantSymbolsCounter++;
			f = false;
		} else break;
	}

	let start_index = nonSignificantSymbolsCounter;
	let count =
		nonSignificantSymbolsCounter > 0 ? nonSignificantSymbolsCounter - 1 : -1;
	for (let i = start_index; i < inNum.length; i++) {
		if (inNum.charAt(i) !== ".") mantissa += inNum.charAt(i);
		else f = false;

		if (f && isNumBiggerThanOne) count++;
		else if (f) {
			count--;
		}
	}

	if (isNumBiggerThanOne) {
		console.log("Normalized: " + sign + mantissa.charAt(0) + "." + mantissa.substring(1) + "E+" + count);
		console.log("Denormalized: " + sign + "0." + mantissa + "E+" + (count + 1));
	} else {
		console.log("Normalized: " + sign + mantissa.charAt(0) + "." + mantissa.substring(1) + "E-" + count);
		console.log("Denormalized: " + sign + "0." + mantissa + "E-" + (count - 1));
	}
}

// перевод дробной части в двоичную СС
function fractBinary(fract, integer_len) {
	let fract_bin = "";
	let i = 0;
	while (Math.floor(fract) !== fract) {
		// ограничение на размер дробной части (нужно чтобы мантисса была не больше 23 бит)
		if (i === 23 - integer_len) break;

		// когда мы переводили целые числа в двоичную СС то делили на 2
		// и брали остатки и записывали в обратном порядке
		// здесь  мы умножаем на 2 и берем целую часть от получившегося числа
		// до тех пор, пока у нас не получится число у которого дробная часть равна 0
		fract_bin += Math.floor(fract * 2) % 2;
		fract *= 2;
		i++;
	}

	if (fract_bin === "") fract_bin = "0";

	return fract_bin;
}

// нахождение экспоненты
function findExponenta(binary_num) {
	let count = -1;
	for (let i = 0; i < binary_num.length; i++) {
		if (binary_num.charAt(i) !== ".") count++;
		else return count;
	}
	return 0;
}

// метод конвертации в IEEE754
function to_IEEE754(num) {
	// считываем знак числа и продолжаем вычисления уже для модуля числа
	let sign = num > 0 ? "0" : "1";
	num = Math.abs(num);
	let integer = Math.floor(num); // целая часть числа
	let exp = 0;
	let moved_exp = "";
	let fractional = num - integer; // дробная часть числа
	let integer_bin = integer.toString(2); // целая часть числа в 2-ой сс
	let fract_bin = fractBinary(fractional, integer_bin.length); // дробная часть числа в 2-ой сс
	let mantissa = integer_bin + fract_bin; // мантисса
	let binary_num = integer_bin + "." + fract_bin; // число в 2-ой сс
	exp = findExponenta(binary_num);
	moved_exp = (exp + 127).toString(2);
	let binaryStr = sign + moved_exp + mantissa.substring(1); // само число в представлении IEEE754
	// если длина binaryStr меньше 32 -> дополняем нулями до 32 символов строку
	if (binaryStr.length < 32) {
		for (let i = binaryStr.length; i < 32; i++) binaryStr += "0";
	}
	console.log("Binary: " + binaryStr);
	console.log("\t\t" + binary_num);
	return binaryStr;
}

function to_IEEE754_hex(num) {
	console.log("Hexadecimal: " + toHexString(num));
}

function toHexString(binaryStr) {
	let hexStr = "";
	// берём каждые 4 бита (т.к. значение идет от 0000 (0) до 1111 (15)) и переводим их в 16-ую систему
	for (let i = 0; i <= binaryStr.length - 4; i += 4) {
		hexStr += byteToHex(binaryStr.substring(i, i + 4));
	}
	return hexStr;
}

function byteToHex(byteStr) {
	let decimal = parseInt(byteStr, 2); // переводим из 2-ой в 10-ю
	return decimal.toString(16); // возвращаем переведенное значение из 10-ой в 16-ю
}

console.log("Enter num: ");
let inNum = prompt(); // ввод числа

exponentNum(inNum);
let out = to_IEEE754(parseFloat(inNum));
to_IEEE754_hex(out);