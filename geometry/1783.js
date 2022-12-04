const { readFileSync } = require("node:fs")
const [[T], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1e4 * 4 + 1) // 40000 + 1
	.map(line => line.split(" ", 2).map(Number.parseFloat))

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

/**
 * Encontra a coordenada de centro de duas circunferências concêntricas
 * a partir de pares de pontos pertencentes a cada uma
 * @description find the coordinate of the center of two concentric circles
 * @param {Array<Point>} circA
 * @param {Array<Point>} circB
 */
function findCoordinateCenterBetweenConcentricCircles(circA, circB) {
	const [{ x: Ax, y: Ay }, { x: Bx, y: By }] = circA
	const [{ x: Cx, y: Cy }, { x: Dx, y: Dy }] = circB

	const dxAB = Ax - Bx, dxCD = Cx - Dx
	const dyAB = Ay - By, dyCD = Cy - Dy

	const SQUARED_SUM_AB = (Ax ** 2 - Bx ** 2) + (Ay ** 2 - By ** 2)
	const SQUARED_SUM_CD = (Cx ** 2 - Dx ** 2) + (Cy ** 2 - Dy ** 2)

	const X = (SQUARED_SUM_AB * dyCD - SQUARED_SUM_CD * dyAB) / (2 * (dxAB * dyCD - dxCD * dyAB))
	const Y = (SQUARED_SUM_AB * dxCD - SQUARED_SUM_CD * dxAB) / (2 * (dyAB * dxCD - dyCD * dxAB))

	return new Point(X || 0, Y || 0)
}

function main() {
	const output = []

	for (let t = 0; t < T; t++) {
		const [XA, YA] = input[4 * t + 0]
		const [XC, YC] = input[4 * t + 1]
		const [XB, YB] = input[4 * t + 2]
		const [XD, YD] = input[4 * t + 3]

		const PA = new Point(XA, YA)
		const PB = new Point(XB, YB)
		const PC = new Point(XC, YC)
		const PD = new Point(XD, YD)

		const { x, y } = findCoordinateCenterBetweenConcentricCircles([PA, PB], [PC, PD])

		output.push(`Caso #${t + 1}: ${x.toFixed(2)} ${y.toFixed(2)}`)
	}

	console.log(output.join("\n"))
}

main()
