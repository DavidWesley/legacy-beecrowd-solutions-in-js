const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const MyMath = Object.create(Math, {
	gcd: {
		value: function gcd([x, y]) {
			if (isNaN(x) || isNaN(y)) return
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
	const responses = []

	for (let index = 0; index < +numCases; index += 1) {
		const S1 = Number.parseInt(lines[2 * index], 2)
		const S2 = Number.parseInt(lines[2 * index + 1], 2)

		if (MyMath.gcd([S1, S2]) > 1)
			responses.push(`Pair #${index + 1}: All you need is love!`)
		else
			responses.push(`Pair #${index + 1}: Love is not all you need!`)
	}

	console.log(responses.join("\n"))
}

main()