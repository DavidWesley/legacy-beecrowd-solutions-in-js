const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function countFullCycles(steps = 0) {
	const FULL_CYCLE_STEPS_SIZE = 2
	return Math.floor(steps / FULL_CYCLE_STEPS_SIZE)
}

function main() {
	const responses = []

	for (let index = 0; index < input.length; index++) {
		const steps = Number.parseInt(input[index], 10)

		if (steps == -1) break
		const fullCyclesCompleted = countFullCycles(steps)

		responses.push(
			`Experiment ${index + 1}: ${fullCyclesCompleted} full cycle(s)`
		)
	}

	console.log(responses.join("\n"))
}

main()