const { readFileSync } = require("fs")
const [target, speedWayWidth] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map((line) => Number.parseInt(line, 10))

console.log("%d", target % speedWayWidth)