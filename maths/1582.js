const MyMath = Object.create(Math, {
	mdc: {
		value: function mdc(x, y) {
			if (isNaN(x) || isNaN(y)) return Number.NaN
			if (x == 0 || y == 0) return 0
			x = Math.abs(x)
			y = Math.abs(y)
			let r = x % y
			while (r != 0) {
				x = y
				y = r
				r = x % y
			}
			return y
		},
		configurable: false,
		enumerable: false,
		writable: false
	}
})

const { readFileSync } = require("node:fs")
const triples = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 3).map((side) => Number.parseInt(side, 10)))


const Triple = {
	isPitagoric(/** @type {[number, number, number]}*/[a, b, c]) {
		return (a * a + b * b) == c * c || (a * a + c * c) == b * b || (b * b + c * c) == a * a
	},

	isPrimitive(/** @type {[number, number, number]}*/[a, b, c]) {
		return MyMath.mdc(a, MyMath.mdc(b, c)) === 1
	}
}


function main() {
	const responses = []

	for (const triple of triples) {
		if (triple.some(isNaN)) break // EOFile Condition Verification

		if (Triple.isPitagoric(triple)) {
			if (Triple.isPrimitive(triple)) responses.push("tripla pitagorica primitiva")
			else responses.push("tripla pitagorica")
		} else {
			responses.push("tripla")
		}
	}

	console.log(responses.join("\n"))
}

main()