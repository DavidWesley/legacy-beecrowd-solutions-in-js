const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const ALPHABET_SIZE = 26
	const responses = new Array(+numLines)

	for (let lineIndex = 0, sum = 0; lineIndex < +numLines; lineIndex++, sum = 0) {
		const [wordA, wordB] = lines[lineIndex].split(" ")

		for (let charIndex = 0; charIndex < wordA.length; charIndex++) {
			const charCodeA = wordA.charCodeAt(charIndex)
			const charCodeB = wordB.charCodeAt(charIndex)

			sum += (ALPHABET_SIZE - (charCodeA - charCodeB)) % ALPHABET_SIZE
		}

		responses[lineIndex] = sum
	}

	console.log(responses.join("\n"))
}

main()