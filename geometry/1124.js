const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

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
	 * @param {Point} firstPoint
	 * @param {Point} secondPoint
	 */
	static distanceBetween(firstPoint, secondPoint) {
		const dx = firstPoint.x - secondPoint.x
		const dy = firstPoint.y - secondPoint.y

		return Math.hypot(dx, dy)
	}
}

/**
 * @param {number} H, @param {number} W
 * @param {number} R1, @param {number} R2
 */

function fitInTheElevator(H, W, R1, R2) {
	const [D1, D2] = [R1, R2].map((r) => r * 2)

	if (Math.min(D1, D2) > Math.max(H, W)) return false
	if (Math.max(D1, D2) > Math.min(H, W)) return false

	if ((R1 + R2) * (1 + Math.SQRT2) <= Math.hypot(H, W)) return true
	if (Math.sqrt(4.0 * R1 * R2) + (R1 + R2) <= Math.max(H, W)) return true

	const C1 = new Point(R1, R1)
	const C2 = new Point(W - R2, H - R2)

	return Coordenates.distanceBetween(C1, C2) >= R1 + R2
}

function main() {
	const responses = []

	const stopAtIndex = input.indexOf("0 0 0 0")
	const dimensionsList = input.slice(0, stopAtIndex).map((dimensions) => {
		return dimensions.split(" ").map((num) => Number.parseInt(num, 10))
	})

	for (const [H, W, R1, R2] of dimensionsList)
		responses.push(fitInTheElevator(H, W, R1, R2) ? "S" : "N")

	console.log(responses.join("\n"))
}

main()