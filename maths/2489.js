const MyMath = Object.create(Math, {
	toRad: {
		/** @param {number} degree */
		value: function (degree) {
			return degree * (Math.PI / 180)
		},
		configurable: false,
		enumerable: false,
		writable: false
	}
})

const { readFileSync } = require("node:fs")

const lines = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line
		.split(" ", 3)
		.map(Number.parseFloat)
	)

function main() {
	const responses = []

	for (const line of lines) {
		if (line.some(isNaN)) break // EOFile Condition

		const [A, D, R] = line
		const H = A - (D / Math.tan(MyMath.toRad(R)))

		responses.push(H.toFixed(4))
	}

	console.log(responses.join("\n"))
}

main()