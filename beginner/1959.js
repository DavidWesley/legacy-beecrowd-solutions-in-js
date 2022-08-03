const { readFileSync } = require("fs")
const [sidesQuant, sidesLength] = readFileSync("/dev/stdin", "utf8")
	.split(/\s/, 2)
	.map(BigInt)

/**
 * @param {bigint | number} regularSides
 * @param {bigint | number} sidesLength
 */

function perimeterFromSimpleRegularPolygons(regularSides, sidesLength) {
	regularSides = BigInt(regularSides)
	sidesLength = BigInt(sidesLength)

	return (regularSides * sidesLength).toString(10)
}

function main() {
	const perimeter = perimeterFromSimpleRegularPolygons(sidesQuant, sidesLength)
	console.log(perimeter)
}

main()
