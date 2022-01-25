const { readFileSync } = require("fs")
const [A, B, C, D] = readFileSync("/dev/stdin", "utf8").split(" ").map(Number)

const isPositive = (num) => Number(num) > 0


/**
 * @template U
 * @param {Array.<U>} set
 * @param {number} k
 * @returns {Array.<U[]>}
 */

function combinations(set, k) {
	if (k > set.length || k <= 0) return []
	if (k === set.length) return [set]
	if (k === 1) return set.map((x) => [x])

	return set.reduce((p, c, i) => {
		combinations(set.slice(i + 1), k - 1)
			.forEach((tailArray) => p.push([c].concat(tailArray)), undefined)

		return p
	}, [])
}


function isTriangle(a = 0, b = 0, c = 0) {
	const sides = [a, b, c].sort((a, b) => a - b)

	if (sides.every(isPositive) === false) return false
	else if (sides[0] + sides[1] <= sides[2]) return false
	else return true
}


function main() {
	const hasTriangle = combinations([A, B, C, D], 3).some(sides => Reflect.apply(isTriangle, null, sides))

	console.log(hasTriangle ? "S" : "N")
}

main()