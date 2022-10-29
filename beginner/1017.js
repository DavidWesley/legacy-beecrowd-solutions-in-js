const { readFileSync } = require("node:fs")
const [time, velocity] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(Number.parseFloat)

function calculeConsumedGas(t, v) {
	const DEFAULT = 12
	return t * v / DEFAULT
}

console.log(calculeConsumedGas(time, velocity).toFixed(3))
