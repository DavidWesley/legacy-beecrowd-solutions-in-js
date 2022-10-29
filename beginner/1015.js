const { readFileSync } = require("node:fs")
const [[X1, X2], [Y1, Y2]] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(point => point.split(" ", 2).map(coordenate => Number.parseFloat(coordenate)))

function distance([x1, y1], [x2, y2]) {
	// return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
	return Math.hypot(x1 - x2, y1 - y2)
}

console.log(distance([X1, X2], [Y1, Y2]).toFixed(4))
