const { readFileSync } = require("fs")
const [numTestCases, ...textsList] = readFileSync("/dev/stdin", "utf8").split("\n")

function getFrequenciesOnQueue(list) {
	return list.reduce((frequencies, key) => (frequencies[`${key}`] = ++frequencies[`${key}`] || 1, frequencies), {})
}

function getMostFrequentChars(str = "") {
	const frequencies = getFrequenciesOnQueue([...str])
	const biggerFrequency = Math.max.apply(null, Object.values(frequencies))
	const mostFrequentChars = Object.entries(frequencies).filter(([, frequency]) => frequency === biggerFrequency)

	return mostFrequentChars.map(([char]) => char)
}

function main() {
	const responses = []

	for (const [index, text] of Object.entries(textsList)) {
		if (index === numTestCases) break

		const alphaChars = text.toLowerCase().replace(/[^a-z]+/gim, "")
		const mostFrequentiesCharsList = getMostFrequentChars(alphaChars) //=
		const ordenedChars = mostFrequentiesCharsList.sort((a, b) => a.localeCompare(b, "pt-BR"))

		responses.push(ordenedChars.join(""))
	}

	console.log(responses.join("\n"))
}

main()