const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const Hanoi = {
	minStepsNumToSolve(numDisc) {
		return numDisc <= 1 ? 1 : Math.pow(2, numDisc) - 1
	}
}

function main() {
	const responses = []

	for (let index = 0; index < input.length; index++) {
		const numDisc = Number.parseInt(input.at(index), 10)
		if (numDisc == 0) break // End of input

		responses.push(
			`Teste ${index + 1}`,
			Hanoi.minStepsNumToSolve(numDisc),
			""
		)
	}

	console.log(responses.join("\n"))
}

main()