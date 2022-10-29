const { readFileSync } = require("node:fs")
const [X, Y] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(Number.parseFloat)

function quadrants(x = 0, y = 0) {
	if (x === 0 && y === 0) return "Origem"

	else if (x === 0) return "Eixo Y"
	else if (y === 0) return "Eixo X"

	else if (y > 0) return (x > 0) ? "Q1" : "Q2"
	else if (y < 0) return (x < 0) ? "Q3" : "Q4"
}

console.log(quadrants(X, Y))
