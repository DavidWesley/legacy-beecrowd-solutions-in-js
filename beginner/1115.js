const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const coordenates = input.map(coord => coord.split(" "))

function quadrantsIndex(x = 0, y = 0) {
	if (x === 0 || y === 0) return
	else if (y > 0) return (x > 0) ? 0 : 1
	else if (y < 0) return (x < 0) ? 2 : 3
}

function main() {
	const responses = []
	const quadrantsName = ["primeiro", "segundo", "terceiro", "quarto"]

	for (const [x, y] of coordenates) {
		const quadrant = quadrantsIndex(+x, +y)

		if (quadrant == undefined) break
		responses.push(quadrantsName[quadrant])
	}

	console.log(responses.join("\n"))
}

main()