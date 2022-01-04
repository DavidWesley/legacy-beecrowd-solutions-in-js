/** @typedef { number | bigint | string } axisType */

class Point {
	/**
	 * @param {axisType} x
	 * @param {axisType} y
	 */
	constructor(x, y) {
		this.x = Number.parseFloat(`${x || 0}`)
		this.y = Number.parseFloat(`${y || 0}`)
	}

	toString() {
		return `${this.x} ${this.y}`
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

	/** @param {Point[]} points */
	static midPoint(points) {
		let x = 0
		let y = 0

		for (let index = 0; index < points.length; index++) {
			x += points[index].x
			y += points[index].y
		}

		return new Point(x / points.length, y / points.length)
	}
}

class Gauss {
	/** @param {Point[]} points */
	static sortPoints(points) {
		points = points.slice(0) // copy the array, since sort() modifies it
		const center = Coordenates.midPoint(points) // finds a point in the interior of `pts`
		const angles = new Map() // calculate the angle between each point and the centerpoint, and sort by those angles

		for (let index = 0; index < points.length; index++) {
			const point = points[index]
			const angle = Math.atan2(point.y - center.y, point.x - center.x)

			angles.set(point.toString(), angle)
		}

		points.sort((p1, p2) => angles.get(p1.toString()) - angles.get(p2.toString()))
		return points
	}

	/** @param {Point[]} points */
	static polygonArea(points) {
		let sum = 0
		if (points.length <= 2) return sum

		const sortedList = this.sortPoints(points.slice(0))

		for (let index = 0; index < sortedList.length; index++) {
			const pA = sortedList[index]
			const pB = sortedList[(sortedList.length + index + 1) % sortedList.length]

			sum += (pA.x * pB.y) - (pB.x * pA.y)
		}

		return 0.5 * sum
	}
}

const { readFileSync } = require("fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.slice(0, 8)
	.map((line) => line.split(" "))
	.map(([x, y]) => new Point(x, y))

function main() {
	const tA = input.slice(0, 4)
	const tB = input.slice(4, 8)

	if (Gauss.polygonArea(tA) > Gauss.polygonArea(tB))
		console.log("terreno A")
	else
		console.log("terreno B")
}

main()