const { readFileSync } = require("fs")
const [L, D, K, P] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/g, 4)
	.map(value => Number.parseInt(value, 10))

console.log((L * K) + P * Math.floor(L / D))