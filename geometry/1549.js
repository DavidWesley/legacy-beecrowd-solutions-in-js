//// CUBIC SOLVER EQUATION ////

const TartagliaCardanoFormula = Object.freeze({

	/**
	 * Solve a cubic equation using the Tartaglia-Cardano formula.
	 * The coefficients are real numbers and the first coefficient can't be zero.
	 * Complex roots are formatted using the following format a+bi.
	 *
	 * @author Code by Henrique Felipe (GitHub: HenriqueIni)
	 *
	 * Fonte: {@link https://blogcyberini.blogspot.com/}
	 *
	 * @license MIT
	 *
	 * @description Equation form: ax³+bx²+cx+d = 0
	 * @param {number} a Coeficient A
	 * @param {number} b Coeficient B
	 * @param {number} c Coeficient C
	 * @param {number} d Coeficient D
	 */
	solve(a, b, c, d) {
		if (a == 0) {
			throw "the coefficient a can't be zero!"
		}
		//the container of the roots (they will be Strings)
		const roots = []
		//it converts the equation to the form x³+Ax³+Bx+C=0
		const A = b / a
		const B = c / a
		const C = d / a

		//constants of the conversion to y³+py+q=0
		const p = B - Math.pow(A, 2) / 3
		const q = C + 2 * Math.pow(A, 3) / 27 - A * B / 3

		//discriminant
		const delta = Math.pow(q, 2) / 4 + Math.pow(p, 3) / 27

		if (delta >= 0) {
			//first root
			const y1 = Math.cbrt(-q / 2 + Math.sqrt(delta)) + Math.cbrt(-q / 2 - Math.sqrt(delta))
			roots[0] = (y1 - A / 3)
			//secondary discriminat of a quadratic equation
			const delta2 = -3 * y1 * y1 - 4 * p
			if (delta2 >= 0) {
				roots[1] = ((-y1 + Math.sqrt(delta2)) / 2 - A / 3)
				roots[2] = ((-y1 - Math.sqrt(delta2)) / 2 - A / 3)
			} else {
				//complex roots: it computes and formats the roots
				const realPart = -y1 / 2
				const imPart = Math.sqrt(Math.abs(delta2)) / 2
				roots[1] = TartagliaCardanoFormula.formatComplexResult(realPart - A / 3, imPart)
				roots[2] = TartagliaCardanoFormula.formatComplexResult(realPart - A / 3, -imPart)
			}
		} else {
			//it uses the Euler's Formula (complex numbers) to compute de roots
			const rho = Math.sqrt(q * q / 4 + Math.abs(delta))
			const theta = Math.acos(-q / (2 * rho))
			roots[0] = (2 * Math.cbrt(rho) * Math.cos(theta / 3) - A / 3)
			roots[1] = (2 * Math.cbrt(rho) * Math.cos((theta + 2 * Math.PI) / 3) - A / 3)
			roots[2] = (2 * Math.cbrt(rho) * Math.cos((theta + 4 * Math.PI) / 3) - A / 3)
		}
		return roots
	},

	/**
	 * @description It formats a complex number (a+bi form)
	 * @param {number} realPart
	 * @param {number} imPart
	 */
	formatComplexResult(realPart, imPart) {
		//a simple case
		if (realPart == 0 && imPart == 0) return "0"

		let number = ""
		if (realPart != 0) {
			number += realPart
			if (imPart > 0) {
				number += "+" + imPart + "i"
			} else if (imPart < 0) {
				number += imPart + "i"
			}
		} else {
			number += imPart + "i"
		}
		return number
	}
})

//// READING FILE ////

const { readFileSync } = require("fs")

const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 3).map(Number.parseFloat))

///// CONES FUNCTIONS /////

/**
 * @param {number} b lower base of the trunk
 * @param {number} B larger base of the trunk
 * @param {number} H height of the trunk
 * @param {number} v volume
 */
function coneTrunkVolumeFromRelativeHeight(b, B, H, v) {
	const K = (B - b) / H

	if (B === b)
		return v / (Math.PI * B * B)

	const ac = K * K
	const bc = 3 * b * K
	const cc = 3 * b * b
	const dd = -(3 * v / Math.PI)

	return TartagliaCardanoFormula
		.solve(ac, bc, cc, dd)
		.filter(root => typeof root === "number")
		.map(Number)
		.shift()
}

//// MAIN ////

function main() {
	const responses = []

	for (let index = 0; index < numCases; index++) {
		const [N, V] = lines[2 * index + 0]
		const [b, B, H] = lines[2 * index + 1]

		const height = coneTrunkVolumeFromRelativeHeight(b, B, H, (V / N))
		responses.push(height.toFixed(2))
	}

	console.log(responses.join("\n"))
}

main()