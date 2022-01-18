const { readFileSync } = require("fs")
const [[numCases], ...pairsList] = readFileSync("/dev/stdin", "utf8").split('\n').map(line => line.split(' '))

/** @typedef { { x: number, y: number } } PointType */
/** @typedef { { firstPos: PointType, lastPos: PointType } } CircumferenceCoordsType */

const Float = (num, precision) => Number.parseFloat(num.toFixed(precision))

/**
* @param {CircumferenceCoordsType} firstCircumference
* @param {CircumferenceCoordsType} secondCircumference
*/

function findCenterCircunferenceCoordenate(firstCircumference, secondCircumference) {
	const { firstPos: { x: x1, y: y1 }, lastPos: { x: x2, y: y2 } } = firstCircumference
	const { firstPos: { x: x3, y: y3 }, lastPos: { x: x4, y: y4 } } = secondCircumference

	const { pow } = Math

	const dx12 = Float((x1 - x2), 2), dy12 = Float((y1 - y2), 2)
	const dx34 = Float((x3 - x4), 2), dy34 = Float((y3 - y4), 2)

	const factor = Float((2.0000 * (dx12 * dy34 - dx34 * dy12)), 4)

	const SQUARED_SUM_1 = Float((pow(x1, 2) - pow(x2, 2)) + (pow(y1, 2) - pow(y2, 2)), 4)
	const SQUARED_SUM_2 = Float((pow(x3, 2) - pow(x4, 2)) + (pow(y3, 2) - pow(y4, 2)), 4)

	const A = (SQUARED_SUM_1 * dy34 - SQUARED_SUM_2 * dy12) / factor
	const B = (SQUARED_SUM_1 * dx34 - SQUARED_SUM_2 * dx12) / factor * (-1.0)

	return [A || 0, B || 0]
}

function main() {
	const responses = []

	for (let i = 0; i < Number.parseInt(numCases, 10); i++) {

		const [X1, Y1] = pairsList[4 * i + 0].slice(0, 2).map(Number.parseFloat)
		const [X3, Y3] = pairsList[4 * i + 1].slice(0, 2).map(Number.parseFloat)
		const [X2, Y2] = pairsList[4 * i + 2].slice(0, 2).map(Number.parseFloat)
		const [X4, Y4] = pairsList[4 * i + 3].slice(0, 2).map(Number.parseFloat)

		const firstCircumference = { firstPos: { x: X1, y: Y1 }, lastPos: { x: X2, y: Y2 } }
		const secondCircumference = { firstPos: { x: X3, y: Y3 }, lastPos: { x: X4, y: Y4 } }

		const [Cx, Cy] = findCenterCircunferenceCoordenate(firstCircumference, secondCircumference)

		responses.push(`Caso #${i + 1}: ${Cx.toFixed(2)} ${Cy.toFixed(2)}`)
	}

	console.log(responses.join("\n"))
}

main()