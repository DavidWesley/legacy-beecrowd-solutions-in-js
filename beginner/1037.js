const { readFileSync } = require("node:fs")
const [input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number.parseFloat)

/**
 * @param {number} start The start of the range.
 * @param {number} stop The stop of the range.
 * @param {number} step The value to increment or decrement by.
 */
function* Range(start = 0, stop, step = 1) {
	if (isNaN(stop)) {
		// one param defined
		[stop, start] = [start, 0]
	}

	for (let value = start; step > 0 ? value < stop : value > stop; value += step)
		yield value
}

function subIntervalIncludesStatus(value, min = 0, max = min, steps = 1) {
	const range = Range(min, max, steps)
	let minLocal, maxLocal = range.next().value

	for (const limit of range) {
		[minLocal, maxLocal] = [maxLocal, limit]

		if (minLocal <= value && value <= maxLocal) {
			return (min === minLocal)
				? `Intervalo [${minLocal}, ${maxLocal}]`
				: `Intervalo (${minLocal}, ${maxLocal}]`
		}
	}

	return "Fora de intervalo"
}

console.log(subIntervalIncludesStatus(input, 0, 100, 25))
