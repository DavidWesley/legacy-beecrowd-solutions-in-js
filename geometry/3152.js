class Point {
	/**
	 * @param { number | bigint | string } x
	 * @param { number | bigint | string } y
	 */
	constructor(x, y) {
		this.x = Number.parseFloat(x.toString(10))
		this.y = Number.parseFloat(y.toString(10))
	}

	toString() {
		return `(${this.x}, ${this.y})`
	}
}

class Coordinates {
	/**
	 * @param {Point} pA
	 * @param {Point} pb
	 */
	static distance(pA, pb) {
		const dx = pA.x - pb.x
		const dy = pA.y - pb.y

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
	/**
	 * Sort points set from its midPoint
	 * @param {Point[]} points
	 */
	static sort(points) {
		const center = Coordinates.midPoint(points) // finds a point in the interior of `pts`
		const angles = new Map() // calculate the angle between each point and the CenterPoint, and sort by those angles

		for (let index = 0; index < points.length; index++) {
			const point = points[index]
			const angle = Math.atan2(point.y - center.y, point.x - center.x)

			angles.set(point.toString(), angle)
		}

		return points.sort((p1, p2) => angles.get(p1.toString()) - angles.get(p2.toString()))
	}

	/** @param {Point[]} points */
	static polygonArea(points) {
		let sum = 0
		if (points.length <= 2) return sum

		const sorted = this.sort(points.slice(0))

		for (let index = 0; index < sorted.length; index++) {
			const pA = sorted[index]
			const pB = sorted[(sorted.length + index + 1) % sorted.length]

			sum += (pA.x * pB.y) - (pB.x * pA.y)
		}

		return 0.5 * sum
	}
}

//// MAIN ////

const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n", 8)
	.map((line) => line.split(" ", 2))
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
