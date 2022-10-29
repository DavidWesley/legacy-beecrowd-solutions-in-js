const { readFileSync } = require("node:fs")
const [N, LA, LB, SA, SB] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/, 5)
	.map((value) => Number.parseInt(value, 10))

console.log(
	N >= Math.max(LA, SA) && N <= Math.min(LB, SB) ? "possivel" : "impossivel"
)
