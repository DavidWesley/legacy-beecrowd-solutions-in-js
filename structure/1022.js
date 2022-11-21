const { readFileSync } = require("node:fs")
const [N, ...input] = readFileSync("/dev/stdin", "utf8").split("\n", 1 + 1e4)

//// MATH ////
const MyMath = Object.create(Math, {
	gcd: {
		/**
		 * @param {number} x
		 * @param {number} y
		 */
		value: function (x, y) {
			if (isNaN(x) || isNaN(y)) return Number.NaN
			x = Math.abs(x)
			y = Math.abs(y)
			while (y) [x, y] = [y, x % y]
			return x
		},
		configurable: false,
		enumerable: false,
		writable: false
	}
})

//// FRACTION ////
const FormattedFractionalEquationsFunctionsEnum = Object.freeze({
	sum: (N1 = 1, D1 = 1, N2 = 0, D2 = 0) => `${(N1 * D2 + N2 * D1)}/${(D1 * D2)}`,
	subtract: (N1 = 1, D1 = 1, N2 = 0, D2 = 0) => `${(N1 * D2 - N2 * D1)}/${(D1 * D2)}`,
	multiply: (N1 = 0, D1 = 0, N2 = 1, D2 = 1) => `${(N1 * N2)}/${(D1 * D2)}`,
	divide: (N1 = 0, D1 = 0, N2 = 1, D2 = 1) => `${(N1 * D2)}/${(N2 * D1)}`,
})

function destructureSimpleFractionalLinearEquation(equation = "") {
	return equation
		.replace(/\s+/g, "")
		.match(/(\d+)\/(\d+)([+\-*/])(\d+)\/(\d+)/s)
		.slice(1, 6)
}

/**
 * Set the correct operation from equation input
 * @param {number} N1
 * @param {number} D1
 * @param {string} operator
 * @param {number} N2
 * @param {number} D2
 */
function fractionalOperation(N1, D1, operator, N2, D2) {
	switch (operator) {
		case "+": return FormattedFractionalEquationsFunctionsEnum.sum(N1, D1, N2, D2)
		case "-": return FormattedFractionalEquationsFunctionsEnum.subtract(N1, D1, N2, D2)
		case "*": return FormattedFractionalEquationsFunctionsEnum.multiply(N1, D1, N2, D2)
		case "/": return FormattedFractionalEquationsFunctionsEnum.divide(N1, D1, N2, D2)
		default: return FormattedFractionalEquationsFunctionsEnum.multiply(N1, D1)
	}
}

/**
 * @param {number} N
 * @param {number} D
 */
function reduceFraction(N, D) {
	const divisor = MyMath.gcd(N, D)
	return [N / divisor, D / divisor]
}

//// MAIN ////
function main() {
	const output = new Array(Number.parseInt(N, 10))

	for (let index = 0; index < output.length; index++) {
		const [nA, dA, op, nB, dB] = destructureSimpleFractionalLinearEquation(input[index])
		const [niA, diA] = fractionalOperation(+nA, +dA, op, +nB, +dB).split("/", 2).map(value => Number.parseInt(value, 10))
		const [nrA, drA] = reduceFraction(niA, diA)

		output[index] = `${niA}/${diA} = ${nrA}/${drA}`
	}

	console.log(output.join("\n"))
}

main()
