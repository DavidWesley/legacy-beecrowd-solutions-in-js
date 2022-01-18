const { readFileSync } = require("fs")
const [S, T, F] = readFileSync("/dev/stdin", "utf8")
	.split(" ")
	.slice(0, 3)
	.map((t) => Number.parseInt(t, 10))

console.log((24 + ((S + T + F) % 24)) % 24)