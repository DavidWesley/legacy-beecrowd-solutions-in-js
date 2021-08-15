const { readFileSync } = require("fs")
const inputs = readFileSync("/dev/stdin", "utf8").split("\n")

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1
const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0
const modulus = (num, modValue = 1) => Number(num) % modValue

function compareAndSortValuesFromMod(a = 0, b = 0, targetMod = 1) {
	if (modulus(a, targetMod) > modulus(b, targetMod)) { return 1 }
	else if (modulus(a, targetMod) < modulus(b, targetMod)) { return -1 }

	if (isOdd(a) && isEven(b)) { return -1 }
	else if (isEven(a) && isOdd(b)) { return 1 }

	if (isOdd(a) && isOdd(b)) { return b - a }
	if (isEven(a) && isEven(b)) { return a - b }

	return 0
}

function parseStringsEntriesToIntegers(currentValue = "") {
	const toInt = (value = "") => Math.trunc(Number(value))
	const parsedToInt = toInt(currentValue)

	if (Number.isNaN(parsedToInt)) return currentValue.split(" ").map(toInt)
	return parsedToInt
}

function deepSortNums([...entries]) {
	const result = []

	while (entries.length > 0) {
		const [N, M] = entries.shift()
		result.push(`${N} ${M}`)

		if (N == 0 || M == 0) break

		const sequenceValues = entries.splice(0, N)
		const sortedValues = sequenceValues.sort((a, b) => compareAndSortValuesFromMod(a, b, M))

		result.push(sortedValues.join("\n"))
	}

	return result
}

function main() {
	const formattedInputs = inputs.map(parseStringsEntriesToIntegers)
	const responses = deepSortNums(formattedInputs)

	console.log(responses.join("\n"))
}

main()