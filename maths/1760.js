const { readFileSync } = require("node:fs")

const sides = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => Number.parseInt(line, 10))

/**
 * @param {number} l side of equilateral triangle
 */
function calcKochsSnowflakeArea(l) {
	return (8 / 5) * (Math.sqrt(3) / 4) * Math.pow(l, 2)
}

function main() {
	const responses = []

	for (const side of sides) {
		if (isNaN(side)) break // EOFile Condition
		else responses.push(calcKochsSnowflakeArea(side).toFixed(2))
	}

	console.log(responses.join("\n"))
}

main()