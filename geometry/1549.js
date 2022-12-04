//// READING FILE ////

const { readFileSync } = require("node:fs")
const [[C], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 3).map(Number.parseFloat))

//// COMPLEX NUMBER ////

class Complex {
	/**
	 * @param {number | bigint | string} re
	 * @param {number | bigint | string} im
	 */
	constructor(re, im) {
		this.real = Number(re)
		this.imag = Number(im)
	}

	/**
	 * It formats a complex number (a+bi form)
	 * @param {Complex} complex The complex number
	 */
	static format(complex) {
		//a simple case
		if (complex.real == 0 && complex.imag == 0) return "0"
		return `${complex.real} ${Math.sign(complex.imag) >= 0 ? "+" : "-"} ${Math.abs(complex.imag)}i`
	}
}

//// CUBIC SOLVER EQUATION ////

const CubicEquationSolver = Object.freeze({

	TartagliaCardanoFormule: Object.freeze({
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
		 * @param {number} a Coefficient A
		 * @param {number} b Coefficient B
		 * @param {number} c Coefficient C
		 * @param {number} d Coefficient D
		 */
		solve(a, b, c, d) {
			if (a == 0)
				throw "the coefficient a can't be zero!"

			//the container of the roots (they will be Strings)
			const roots = new Array(3).fill(0)
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
				//secondary discriminant of a quadratic equation
				const delta2 = -3 * y1 * y1 - 4 * p
				if (delta2 >= 0) {
					roots[1] = ((-y1 + Math.sqrt(delta2)) / 2 - A / 3)
					roots[2] = ((-y1 - Math.sqrt(delta2)) / 2 - A / 3)
				} else {
					//complex roots: it computes and formats the roots
					const re = (-y1 / 2) - A / 3
					const im = Math.sqrt(Math.abs(delta2)) / 2
					roots[1] = Complex.format(new Complex(re, im))
					roots[2] = Complex.format(new Complex(re, -im))
				}
			} else {
				//it uses the Euler's Formula (complex numbers) to compute the roots
				const rho = Math.sqrt(q * q / 4 + Math.abs(delta))
				const theta = Math.acos(-q / (2 * rho))

				roots[0] = (2 * Math.cbrt(rho) * Math.cos(theta / 3) - A / 3)
				roots[1] = (2 * Math.cbrt(rho) * Math.cos((theta + 2 * Math.PI) / 3) - A / 3)
				roots[2] = (2 * Math.cbrt(rho) * Math.cos((theta + 4 * Math.PI) / 3) - A / 3)
			}

			return roots
		}
	})
})

///// CONES FUNCTIONS /////

/**
 * @param {number} base lower base of the trunk
 * @param {number} Base larger base of the trunk
 * @param {number} Height height of the trunk
 * @param {number} volume volume
 */
function calculateConeTrunkVolumeFromRelativeHeight(base, Base, Height, volume) {
	const K = (Base - base) / Height

	if (Base === base)
		return volume / (Math.PI * Base * Base)

	const cofA = K * K
	const cofB = 3 * base * K
	const cofC = 3 * base * base
	const cofD = -(3 * volume / Math.PI)

	return CubicEquationSolver.TartagliaCardanoFormule
		.solve(cofA, cofB, cofC, cofD)
		.filter(root => typeof root === "number")
		.map(Number)
		.shift()
}

//// MAIN ////

async function main() {
	const output = []

	for (let index = 0; index < C; index++) {
		const [N, V] = input[2 * index + 0]
		const [b, B, H] = input[2 * index + 1]
		const height = calculateConeTrunkVolumeFromRelativeHeight(b, B, H, (V / N))
		output.push(height.toFixed(2))
	}

	console.log(output.join("\n"))
}

main()
