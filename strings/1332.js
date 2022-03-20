const { readFileSync } = require("fs")
const [numTestCases, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * @param {string} str1
 * @param {string} str2
 */
function hammingDistance(str1, str2 = str1) {
	// const [longerWord, shorterWord] = [str1, str2].sort((a, b) => b.length - a.length)
	const [longerWord, shorterWord] = str1.length >= str2.length ? [str1, str2] : [str2, str1]

	return Array.from(longerWord).reduce((counter, char, index) => (char !== shorterWord.charAt(index) ? counter++ : counter, counter), 0)
}

const corretcWords = Object.seal({
	one: Object.freeze({ name: "one", value: 1 }),
	two: Object.freeze({ name: "two", value: 2 }),
	three: Object.freeze({ name: "three", value: 3 })
})

function main() {
	const MAX_VALID_DIFFERENCE = 1

	const responses = []
	const listWords = input.slice(0, +numTestCases)
	const corretcWordsValues = Object.values(corretcWords)

	for (const word of listWords) {
		for (const { name, value } of corretcWordsValues) {
			const distance = hammingDistance(word, name)

			if (distance <= MAX_VALID_DIFFERENCE) {
				responses.push(value)
				break
			}
		}
	}

	console.log(responses.join("\n"))
}

main()