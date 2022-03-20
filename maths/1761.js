const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ").map(Number.parseFloat))

const PI = 3.141592654
const toRad = (degree) => Number.parseFloat(degree) * (PI / 180.0)

function main() {
	const responses = []

	for (const [angle, horizontalDistance, personHeight] of input) {
		if (isNaN(angle) || isNaN(horizontalDistance) || isNaN(personHeight)) break

		const radians = toRad(angle)
		const treeHeight = Math.tan(radians) * (horizontalDistance) + personHeight
		const cordonsQuantities = treeHeight * 5

		responses.push(cordonsQuantities.toFixed(2))
	}

	console.log(responses.join("\n"))
}

main()