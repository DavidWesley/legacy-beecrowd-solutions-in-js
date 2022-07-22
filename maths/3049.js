
const { readFileSync } = require("node:fs")

const [B, T] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(value => Number.parseInt(value, 10))


/**
 * @param {number} b lower base of the trapeze
 * @param {number} B larger base of the trapeze
 * @param {number} h height of the trapeze
*/
const trapeze = (b, B, h) => ((B + b) * h) / 2

const CASH_OF_100_DIMENSIONS_IN_CENTIMETERS = {
	width: 160,
	height: 70
}

function main() {
	const totalArea = trapeze(
		CASH_OF_100_DIMENSIONS_IN_CENTIMETERS.width,
		CASH_OF_100_DIMENSIONS_IN_CENTIMETERS.width,
		CASH_OF_100_DIMENSIONS_IN_CENTIMETERS.height
	)

	const fArea = trapeze(B, T, CASH_OF_100_DIMENSIONS_IN_CENTIMETERS.height)
	const mArea = totalArea - fArea

	if (fArea > mArea)
		console.log(1)
	else if (fArea < mArea)
		console.log(2)
	else
		console.log(0)
}

main()