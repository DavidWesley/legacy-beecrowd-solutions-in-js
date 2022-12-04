const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 4).map(Number.parseFloat))

class ObliqueThrow {
	static maxHorizontalDistance(velocity, height, acceleration = 9.8) {
		return (velocity / acceleration) * Math.sqrt(Math.pow(velocity, 2) + 2 * acceleration * height)
	}
}

function main() {
	const output = []

	for (const [R, H, V, G] of input) {
		if ([R, H, V, G].includes(NaN)) break // EOF
		else output.push(ObliqueThrow.maxHorizontalDistance(V, H, G) >= R ? "Y" : "N")
	}

	console.log(output.join("\n"))
}

main()
