const { readFileSync } = require("fs")
const [N] = readFileSync("/dev/stdin", "utf8").split("\n")

/** @param {number} n */

function estimatedPrimesNumUntilLimit(n) {
	const estimated = n / Math.log(n)

	return [estimated, 1.25506 * estimated]
}

function main() {
	const [min, max] = estimatedPrimesNumUntilLimit(Number.parseInt(N, 10))
	console.log(min.toFixed(1), max.toFixed(1))
}

main()