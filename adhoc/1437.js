const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const CardinalPointsEnum = Object.freeze({
	NORTH: "N",
	LEST: "L",
	SOUTH: "S",
	WEST: "O",
})


function main() {
	const output = []

	for (let index = 0; index < input.length; index += 2) {
		if (input[index] === "0") break

		const finalCardinalPointIndex = input[index + 1]
			.split("", Number.parseInt(input[index], 10))
			.reduce((final, turn) => {
				switch (turn) {
					case "D": return final + 1
					case "E": return final - 1
					default: return final
				}
			}, 0 /* Starts point to North */)

		switch (((finalCardinalPointIndex % 4) + 4) % 4) {
			case 0: output.push(CardinalPointsEnum.NORTH); break
			case 1: output.push(CardinalPointsEnum.LEST); break
			case 2: output.push(CardinalPointsEnum.SOUTH); break
			case 3: output.push(CardinalPointsEnum.WEST); break
		}
	}

	console.log(output.join("\n"))
}

main()
