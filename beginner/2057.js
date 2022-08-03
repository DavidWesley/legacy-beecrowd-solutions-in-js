const { readFileSync } = require("fs")
const [S, T, F] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map((t) => Number.parseInt(t, 10))

console.log((24 + ((S + T + F) % 24)) % 24)