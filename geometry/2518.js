const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")

const rect = (x = 0, y = x) => x * y
const hypotenuse = (a, b = 0) => Math.hypot(a, b)

function rampArea(rungs = { quantities: 0, height: 0, width: 0, length: 0 }) {
	const conversionRate = 1e-4
	const hypot = hypotenuse(rungs.height, rungs.width)

	const rampWidth = rungs.length
	const rampLength = hypot * rungs.quantities

	return rect(rampLength, rampWidth) * conversionRate
}

function main() {
	const responses = []

	const stairDimensionsRegex = /^(\s?\d+){4}$/gm
	const stairsDimensionsList = input.match(stairDimensionsRegex).map((match) => {
		return match.split(/\s/).map((dimension) => Number.parseInt(dimension, 10))
	})

	for (const [N, H, C, L] of stairsDimensionsList) {
		const area = rampArea({ quantities: N, height: H, width: C, length: L })

		responses.push(`${area.toFixed(4)}`)
	}

	console.log(`${responses.join("\n")}`)
}

main()