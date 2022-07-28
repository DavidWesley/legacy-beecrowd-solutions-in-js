const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 3).map(value => Number.parseInt(value, 10)))

/** @typedef {number | bigint | string} axisType */

class Point3D {
	/**
	 * @param {axisType} x
	 * @param {axisType} y
	 * @param {axisType} z
	 */
	constructor(x, y, z) {
		this.x = Number.parseFloat(x.valueOf().toString())
		this.y = Number.parseFloat(y.valueOf().toString())
		this.z = Number.parseFloat(z.valueOf().toString())
	}
}

class Coordenates3D {
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

function main() {
	const output = []
	const points3DList = lines.slice(0, numLines).map((coord) => new Point3D(...coord))

	for (let i = 0; i < numLines; i++) {
		let distance = Number.POSITIVE_INFINITY
		for (let j = 0; j < numLines; j++) if (i != j) distance = Math.min(distance, Coordenates3D.distance(points3DList[i], points3DList[j]))
		output.push(getSignalIntensityFromDistance(distance))
	}

	console.log(output.join("\n"))
}

main()