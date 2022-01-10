const { readFileSync } = require("fs")
const [numTestCases, ...cases] = readFileSync("/dev/stdin", "utf8").split("\n")

const MyMath = Object.create(Math, {
	gcd: {
		value: function gcd([x, y]) {
			if (isNaN(x) || isNaN(y)) return Number.NaN
			x = Math.abs(x), y = Math.abs(y)
			while (y) [x, y] = [y, x % y]
			return x
		},
		configurable: false,
		enumerable: false,
		writable: false
	}
})

function main() {
	const figurinesPairList = cases
		.slice(0, +numTestCases)
		.map((figurinesPair) => figurinesPair.split(" ").map((num) => Number.parseInt(num, 10)))

	const responses = figurinesPairList.map(MyMath.gcd)

	console.log(`${responses.join("\n")}`)
}

main()