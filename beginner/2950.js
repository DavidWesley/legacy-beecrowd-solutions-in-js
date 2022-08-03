const { readFileSync } = require("fs")
const [distanceBetweenPalantirs, diameterA, diameterB] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map(Number.parseFloat)

console.log((distanceBetweenPalantirs / (diameterA + diameterB)).toFixed(2))
