const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function fullyQuotient(...nums) {
	const kNums = nums.flat(Infinity)
	return kNums.reduce((res, value) => res / value)
}

function main() {
	const numCases = Number.parseInt(input.shift(), 10)
	const pairs = input.slice(0, numCases).map(pair => {
		return pair
			.split(" ", 2)
			.map(value => Number.parseInt(value, 10))
	})

	const quotients = pairs.map(pair => fullyQuotient(pair))

	const responses = quotients.map((quotient) => {
		return `${Number.isFinite(quotient) ? quotient.toFixed(1) : "divisao impossivel"}`
	})

	console.log(responses.join("\n"))
}

main()