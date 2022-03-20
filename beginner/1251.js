const { readFileSync } = require("fs")
const inputs = readFileSync("/dev/stdin", "utf8").split("\n")

function returnASCIICode([...chars] = "") {
	return chars.map((v) => v.charCodeAt(0))
}

function getFrequencies(itens = [0]) {
	const counter = (arr = [], key) => arr.filter(el => el === key).length
	return [...new Set(itens)].map(uniqueKey => [uniqueKey, counter(itens, uniqueKey)])
}

function orderEntries(entries = [[0, 0]]) {
	return entries.sort((a, b) => {
		const [keyA, valueA] = a
		const [keyB, valueB] = b

		return valueA - valueB || keyB - keyA
	})
}

function main() {
	const responses = []

	const charsSets = inputs.filter(input => input != "")
	const charsSetsCodes = charsSets.map(returnASCIICode)
	const charsCodesFrequenciesEntries = charsSetsCodes.map(getFrequencies)
	const ordenedCharsFrequenciesEntries = charsCodesFrequenciesEntries.map(orderEntries)

	for (const ordenedEntries of ordenedCharsFrequenciesEntries) {
		const joinedEntries = []

		for (const entry of ordenedEntries) joinedEntries.push(entry.join(" "))
		responses.push(joinedEntries.join("\n"))
	}

	console.log(responses.join("\n\n"))
}

main()
