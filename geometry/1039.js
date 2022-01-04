const { readFileSync } = require("fs")
const coordenatesList = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((coords) => coords.split(" ").map((value) => Number.parseInt(value, 10)))

function distanceBetween(x1 = 0, y1 = 0, x2 = x1, y2 = y1) {
	return Math.hypot(x1 - x2, y1 - y2)
}

function main() {
	const responses = []

	for (const [R1, X1, Y1, R2, X2, Y2] of coordenatesList) {
		if (R1 < R2) responses.push("MORTO")
		else responses.push(distanceBetween(X1, Y1, X2, Y2) > R1 - R2 ? "MORTO" : "RICO")
	}

	console.log(responses.join("\n"))
}

main()