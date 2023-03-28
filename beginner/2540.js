const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 1e5).map(value => Number.parseInt(value, 10)))

/** @param {number[]} votes  */
function isImpeachment(votes, size = votes.length) {
	let inFavourVotesCounter = 0

	for (let index = 0; index < size; index++)
		if (votes[index] === 1)
			inFavourVotesCounter += 1

	return 3 * inFavourVotesCounter >= 2 * size
}

function main() {
	const output = []

	for (let index = 0; index < input.length; index += 2) {
		const [N] = input[index]
		if (Number.isNaN(N)) break // EOF
		output.push(isImpeachment(input[index + 1], N) ? "impeachment" : "acusacao arquivada")
	}

	console.log(output.join("\n"))
}

main();