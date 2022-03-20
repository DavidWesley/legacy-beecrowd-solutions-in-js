// Expensive Solution, but more elegant!

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/** @param {any[][]} arrs  */

function zip(...arrs) {
	return Array.from(
		{ length: Math.max.apply(null, arrs.map((arr) => arr.length)) },
		(_, index) => arrs.map((arr) => arr[index] ?? ""))
}

const getInitialsCharForEachWord = (words = "") => words.match(/\b\w/g)
const getFinalsCharForEachWord = (words = "") => words.match(/\w\b/g)

function main() {
	const responses = []

	const targetWord = "COBOL"

	for (const line of input) {
		// This can be a function!
		if (line === "") break // EOFile Condition Verification

		const upperedLine = line.toUpperCase()

		const initialsChars = getInitialsCharForEachWord(upperedLine)
		const finalsChars = getFinalsCharForEachWord(upperedLine)

		const zippedChars = zip(initialsChars, finalsChars)
		const isMatched = zippedChars.every((tuple, index) => tuple.includes(targetWord.charAt(index)))

		responses.push(isMatched ? "GRACE HOPPER" : "BUG")
	}

	console.log(responses.join("\n"))
}

main()