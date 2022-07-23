/** @typedef {number | bigint | string} axisType */

class Point {
	/**
	 * @param {axisType} x
	 * @param {axisType} y
	 */
	constructor(x, y) {
		this.x = Number.parseFloat(`${x}`)
		this.y = Number.parseFloat(`${y}`)
	}
}

class Coordenates {
	/**
	 * @param {Point} pointA
	 * @param {Point} pointB
	 */
	static distance(pointA, pointB) {
		const dx = pointA.x - pointB.x
		const dy = pointA.y - pointB.y

		return Math.hypot(dx, dy)
	}
}


const { readFileSync } = require("node:fs")

const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 6).map(Number.parseFloat))


/** @param {Array<number>} sides */
function perimeter([...sides]) {
	return sides.reduce((acc, cur) => acc + cur, 0)
}

/** @param {Array<number>} sides */
function heronFormula([...sides]) {
	const semiperimeter = perimeter(sides) / 2

	return Math.sqrt(
		sides
			.map(side => semiperimeter - side)
			.reduce((acc, cur) => acc * cur, semiperimeter)
	)
}


function main() {
	const responses = []

	for (const line of lines.slice(0, numLines)) {
		const [xA, yA, xB, yB, xC, yC] = line

		const pA = new Point(xA, yA)
		const pB = new Point(xB, yB)
		const pC = new Point(xC, yC)

		const sideA = Coordenates.distance(pA, pB)
		const sideB = Coordenates.distance(pB, pC)
		const sideC = Coordenates.distance(pA, pC)

		const sides = [sideA, sideB, sideC]

		responses.push(heronFormula(sides).toFixed(3))
	}

	console.log(responses.join("\n"))
}

main()