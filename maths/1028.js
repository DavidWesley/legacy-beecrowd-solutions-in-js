const { readFileSync } = require("node:fs")
const [[numTestCases], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 2).map(value => Number.parseInt(value, 10)))

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

function main() {
	const output = Array.from({ length: numTestCases }, (_, index) => MyMath.gcd(...input[index]))
	console.log(output.join("\n"))
}

main()
