const { readFileSync } = require("fs")

const lines = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

const MyMath = Object.create(Math, {
	gcd: {
		/**
		 * @param {number} x
		 * @param {number} y
		 */
		value: function gcd(x, y) {
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

function getNumStakes(height, width) {
	const H = Number.parseFloat(height)
	const W = Number.parseFloat(width)

	return 2 * (H + W) / MyMath.gcd(H, W)
}

function main() {
	const responses = new Array()

	for (const line of lines) {
		if (line.includes("")) break // EOFile Condition
		else responses.push(getNumStakes(line[0], line[1]))
	}

	console.log(responses.join("\n"))
}

main()