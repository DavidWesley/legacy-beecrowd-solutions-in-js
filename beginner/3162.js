const { readFileSync } = require("node:fs")
const [[N], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 3).map(value => Number.parseInt(value, 10)))


class Point3D {
	/**
	 * @typedef {number | bigint | string} axisType
	 * @param {axisType} x
	 * @param {axisType} y
	 * @param {axisType} z
	 */
	constructor(x, y, z) {
		this.x = Number.parseFloat(x.toString(10))
		this.y = Number.parseFloat(y.toString(10))
		this.z = Number.parseFloat(z.toString(10))
	}
}

class Coordinates3D {
	/**
	 * @param {Point3D} pointA
	 * @param {Point3D} pointB
	 */
	static distance(pointA, pointB) {
		const dx = pointA.x - pointB.x
		const dy = pointA.y - pointB.y
		const dz = pointA.z - pointB.z

		return Math.hypot(dx, dy, dz)
	}
}

/**
 * find the closest distance between a point and another multiple points
 * @param {Point3D} point
 * @param {number} index
 * @param {Point3D[]} points
 */
const calculateClosestDistance3D = (point, index, points) => {
	let distance = Number.POSITIVE_INFINITY
	for (let j = 0; j < N; j++) if (index != j) distance = Math.min(distance, Coordinates3D.distance(point, points[j]))

	return distance
}

const SignalIntensityEnum = Object.freeze({
	HIGH: "A",
	MEDIUM: "M",
	LOW: "B"
})

const getSignalIntensityFromDistance = (distance) => {
	if (distance <= 20) return SignalIntensityEnum.HIGH
	if (20 <= distance && distance <= 50) return SignalIntensityEnum.MEDIUM
	if (50 <= distance) return SignalIntensityEnum.LOW
}

const output = input
	.splice(0, N)
	.map(([X, Y, Z]) => new Point3D(X, Y, Z))
	.map(calculateClosestDistance3D)
	.map(getSignalIntensityFromDistance)

console.log(output.join("\n"))
