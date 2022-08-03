const { readFileSync } = require("fs")
const [A1, A2, A3, A4] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 4)
	.map(area => Number.parseInt(area, 10))
	.sort((areaA, areaB) => areaA - areaB)

console.log((A1 * A4 == A2 * A3) ? "S" : "N")