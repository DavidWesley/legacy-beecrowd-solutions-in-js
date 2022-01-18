const { readFileSync } = require("fs")
const [numCases, ...numbers] = readFileSync("/dev/stdin", "utf8").split("\n")

const LEDsNumbersForEachDigitsValuesEnum = { "0": 6, "1": 2, "2": 5, "3": 5, "4": 4, "5": 5, "6": 6, "7": 3, "8": 7, "9": 6 }

function main() {
	const responses = []
	const digitsCountObj = createKeysObjetctFromValues(0, 10, 0, false)

	for (let index = 0; index < +numCases; index++) {
		const num = numbers[index]

		for (const digit in digitsCountObj)
			// num.match(new RegExp(digit, 'g'))?.length ?? 0   | WORK TOO! | ES2020+
			// [...num].filter((char) => char === digit).length | WORK!     | ES6+
			digitsCountObj[digit] = num.match(new RegExp(digit, "g"))?.length ?? 0

		const result = numberOfLEDs(digitsCountObj)
		responses.push(result)
	}

	console.log(responses.join("\n"))
}

main()

function createKeysObjetctFromValues(infLimit = 0, supLimit = -1, defaultStartValue = null, frozen = false) {
	const arr = Array.from({ length: supLimit - infLimit }, () => defaultStartValue ?? "")
	const obj = Object.fromEntries(Object.entries(arr))
	return frozen ? Object.freeze(obj) : obj
}

function numberOfLEDs(digitsCounterObj) {
	let sum = 0
	for (const digit in digitsCounterObj)
		sum += digitsCounterObj[digit] * LEDsNumbersForEachDigitsValuesEnum[digit]

	return `${sum} leds`
}
