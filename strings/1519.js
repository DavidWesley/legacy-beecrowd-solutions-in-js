const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/** @param {string} text */
function generateAbreviatedWordsObject(text) {
	const words = text.split(" ")
	const abreviationsDictionary = new Map()

	/**
	 * @param {string[]} list
	 * @param {string} prev
	 * @param {string} curr
	 */
	function isMostEconomic(list, prev, curr) {
		if (prev === curr) return false

		let prevWordFrequencyCounter = 0
		let currWordFrequencyCounter = 0

		for (const word of list) {
			if (word === prev) prevWordFrequencyCounter += 1
			else if (word === curr) currWordFrequencyCounter += 1
		}

		const oldWordSizeReductionEconomy = prevWordFrequencyCounter * (prev.length - 2)
		const newWordSizeReductionEconomy = currWordFrequencyCounter * (curr.length - 2)

		return newWordSizeReductionEconomy > oldWordSizeReductionEconomy
	}

	for (let index = 0; index < words.length; index += 1) {
		const word = words[index]
		const abreviation = word.charAt(0).concat(".")

		if (word.length > 2) {
			const previousStoredWord = abreviationsDictionary.get(abreviation)
			if (Boolean(previousStoredWord) === false) abreviationsDictionary.set(abreviation, word)
			else if (previousStoredWord !== word && isMostEconomic(words, previousStoredWord, word)) abreviationsDictionary.set(abreviation, word)
		}
	}

	const sortedAbreviationsDictionaryEntries = Array
		.from(abreviationsDictionary.entries())
		.sort(([keyA], [keyB]) => keyA.localeCompare(keyB, "en-US"))

	for (const [key, word] of sortedAbreviationsDictionaryEntries)
		text = text.replace(new RegExp(`\\b${word}\\b`, "g"), key)

	return Object.freeze({
		text: text,
		dictionary: sortedAbreviationsDictionaryEntries
	})
}


function main() {
	const output = []

	for (const line of input) {
		if (line === "" || line === ".") break
		const abreviatedWordsObject = generateAbreviatedWordsObject(line)

		output.push(
			abreviatedWordsObject.text,
			abreviatedWordsObject.dictionary.length,
			...abreviatedWordsObject.dictionary.map(([abreviation, word]) => `${abreviation} = ${word}`)
		)
	}

	console.log(output.join("\n"))
}

main()
