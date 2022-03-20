const { readFileSync } = require("fs")
const [[X1, X2], [Y1, Y2]] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(point => point.split(" ").map(coordenate => Number.parseFloat(coordenate)))

function distance([x1, y1], [x2, y2]) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)).toFixed(4)
}

function main() {
	const dist = distance([X1, X2], [Y1, Y2])
	console.log(dist)
}

main()