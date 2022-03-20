const { readFileSync } = require("fs")
const [numTestCases, ...numbers] = readFileSync("/dev/stdin", "utf8").split("\n")

function getFrequenciesInQueue(list) {
	return list.reduce((frequencies, key) => (frequencies[`${key}`] = ++frequencies[`${key}`] || 1, frequencies), {})
}

function main() {
	const responses = []

	const numbersLists = numbers.slice(0, +numTestCases).map(num => Number.parseInt(num, 10))
	const frequenciesList = getFrequenciesInQueue(numbersLists)

	for (const [key, frequency] of Object.entries(frequenciesList)) {
		responses.push(
			`${key} aparece ${frequency} vez(es)`
		)
	}

	console.log(responses.join("\n"))
}

main()