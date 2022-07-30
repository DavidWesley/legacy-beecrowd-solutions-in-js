const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const output = []

	for (let i = 0; i < input.length; i += 2) {
		if (input[i] == "") break // EOFile Condition

		const votesQuantity = Number.parseInt(input[i], 10)
		const positiveVotesQuantity = input[i + 1].split(" ", votesQuantity).filter(v => v == "1").length
		output.push(votesQuantity * 2 > 3 * positiveVotesQuantity ? "acusacao arquivada" : "impeachment")
	}

	console.log(output.join("\n"))
}

main()