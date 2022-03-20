const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")
const numTestCases = Number.parseInt(input.shift())

function isASubSequence(subsequence = "", targetWord = "") {
	let finalSubsequence = ""

	for (
		let currentLetterIndex = 0, fromIndex = 0;
		currentLetterIndex < subsequence.length && fromIndex < targetWord.length;
		currentLetterIndex++
	) {
		const restingWord = targetWord.substring(fromIndex)
		const currentLetter = subsequence.charAt(currentLetterIndex)
		const newIndexInRestingWord = restingWord.indexOf(currentLetter) + 1

		fromIndex += newIndexInRestingWord

		if (newIndexInRestingWord > 0) finalSubsequence += currentLetter
	}

	return finalSubsequence === subsequence
}

function validateSubsequencesFromWord(subsequenceList = [""], targetWord = "") {
	return subsequenceList.map(subsequence => isASubSequence(subsequence, targetWord))
}

function main() {
	const responses = []

	for (let currentCase = 0; currentCase < numTestCases; currentCase++) {
		const searchableWord = input.shift()
		const numQueries = Number.parseInt(input.shift())
		const subsequences = input.splice(0, numQueries)

		validateSubsequencesFromWord(subsequences, searchableWord)
			.map(isValid => isValid ? "Yes" : "No")
			.forEach(response => { responses.push(response) })
	}

	console.log(responses.join("\n"))
}

main()