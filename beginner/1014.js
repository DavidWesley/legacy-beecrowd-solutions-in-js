const { readFileSync } = require("node:fs")
const [X, Y] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(Number)

const consum = (d = 0, l = 1) => (d / l)

console.log("%s km/l", consum(X, Y).toFixed(3))
