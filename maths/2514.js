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
	},
	lcm: {
		/** @param {number[]} nums */
		value: function (...nums) {
			if (nums.includes(0)) return 0
			return nums.reduce((lcm, value) => (lcm * value) / this.gcd(value, lcm))
		},
		configurable: false,
		enumerable: false,
		writable: false
	}
})


function main() {
	const responses = new Array()

	for (let i = 0; i < lines.length; i += 2) {
		if (lines[i].includes("")) break // EOFile

		const [pA, pB, pC] = lines[i + 1].map((period) => Number.parseInt(period, 10))

		const timeFromTheLastPlanetsAlignment = Number.parseInt(lines[i][0], 10)
		const intervalForEachPlanetsAlignment = MyMath.lcm(pA, pB, pC)
		const timeToNextPlanetsAlignment = intervalForEachPlanetsAlignment - timeFromTheLastPlanetsAlignment

		responses.push(timeToNextPlanetsAlignment)
	}

	console.log(responses.join("\n"))
}

main()