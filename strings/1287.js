const { readFileSync } = require("fs")
const cases = readFileSync("/dev/stdin", "utf8").split("\n")

const MAX_ACEPTABLE_INTEGER = 2147483647

const isALegallInteger = (num) => Number.isInteger(num) && num <= MAX_ACEPTABLE_INTEGER

function processInputIntoIntengers(inputInteger = "") {
	const processedNum = inputInteger
		.replace(/[l]/g, "1")
		.replace(/[Oo]/g, "0")
		.replace(/[\,\s]/g, "")

	return processedNum.replace(/\D/g, "") === processedNum
		? Number.parseInt(processedNum, 10)
		: NaN
}

function main() {
	const responses = []

	cases.forEach((input) => {
		const processedInteger = processInputIntoIntengers(input)

		responses.push(
			isALegallInteger(processedInteger) ? processedInteger : "error"
		)
	})


	const rest = responses.pop() //! bug

	console.log(`${responses.join("\n")}`)
}

main()
