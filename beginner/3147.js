const { readFileSync } = require("node:fs")
const [H, E, A, O, W, X] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 6)
	.map(value => Number.parseInt(value, 10))

console.log(
	(H + E + A + X) >= (O + W) ? "Middle-earth is safe." : "Sauron has returned."
)
