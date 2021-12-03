const { readFileSync } = require("fs")
const [numTestCases, ...numbers] = readFileSync("/dev/stdin", "utf8").split('\n')

function main() {
	const responses = []

	const LEDsNumbersForEachDigitsValuesArray = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]
	const LEDsNumbersForEachDigitsEntriesArray = Object.entries(LEDsNumbersForEachDigitsValuesArray) // [[Digit, numberOfLEDSIntoDigit]]
	const LEDsNumbersForEachDigitsMap = new Map(LEDsNumbersForEachDigitsEntriesArray)

	const digitsCountObj = initDigitsCounterObj(0, LEDsNumbersForEachDigitsValuesArray.length, 0)

	for (const [index, num] of Object.entries(numbers)) {
		if (index === numTestCases) break

		for (const digit of Object.keys(digitsCountObj))
			digitsCountObj[digit] = [...num].filter((char) => char === digit).length
		// num.match(new RegExp(digit, 'g'))?.length ?? 0   | WORK TOO! | ES2020+
		// [...num].filter((char) => char === digit).length | WORK!     | ES6+

		const result = numberOfLEDs(LEDsNumbersForEachDigitsMap, digitsCountObj)
		responses.push(result)
	}

	console.log(responses.join('\n'))
}

main()

function initDigitsCounterObj(infLimit = 0, supLimit = -1, defaultStartValue, frozen = false) {
	const arr = Array.from({ length: supLimit - infLimit }, () => defaultStartValue ?? '')
	const obj = Object.fromEntries(Object.entries(arr))
	return frozen ? Object.freeze(obj) : obj
}

function numberOfLEDs(LEDsNumbersMap, digitsCounterObj, sum = 0) {
	for (const [digitIndex, value] of Object.entries(digitsCounterObj))
		sum += value * LEDsNumbersMap.get(digitIndex)

	return `${sum} leds`
}
