const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").slice(0, 4).map(Number.parseFloat))

class ObliqueThrow {
	static maxHorizontalDistance(velocity, height, acceleration = 9.8) {
		return (velocity / acceleration) * Math.sqrt(Math.pow(velocity, 2) + 2 * acceleration * height)
	}
}

function main() {
	const responses = []

	for (const [R, H, V, G] of input) {
		if ([R, H, V, G].includes(NaN)) break // EOFile Condition

		const maxDist = ObliqueThrow.maxHorizontalDistance(V, H, G)
		responses.push(maxDist >= R ? "Y" : "N")
	}

	console.log(responses.join("\n"))
}

main()