const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const value = Number.parseFloat(input.shift())

function createInterval(min = 0, max = 100, steps = 2) {
	const stepsCounter = steps >= 2 ? steps : 2
	const intervalArray = Array.from({ length: steps + 1 }, (_, i) => {
		return min + ((max - min) / stepsCounter) * i // stepValue
	})

	return intervalArray
}

function subIntervalInclude(v, min = 0, max = 100, steps = 2) {
	const intervalSteps = createInterval(min, max, steps)

	for (let index = 0; index < intervalSteps.length - 1; index++) {
		const minLocal = intervalSteps[index]
		const maxLocal = intervalSteps[index + 1]

		if (v > minLocal && v <= maxLocal) {
			if (minLocal === min) return `Intervalo [${minLocal}, ${maxLocal}]`
			return `Intervalo (${minLocal}, ${maxLocal}]`
		}
	}

	return "Fora de intervalo"
}

function main() {
	const interval = subIntervalInclude(value, 0, 100, 4)
	console.log(interval)
}

main()