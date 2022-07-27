const { readFileSync } = require("fs")
const [num] = readFileSync("/dev/stdin", "utf8").split(/\s+/)

/**
 * Binet formula implementation to calculate fibonacci numbers
 * @param {number} nth
 */
function binetFormule(nth) {
	nth = Math.floor(Math.max(0, nth))
	if (nth <= 0) return 0

	const sqrt5 = Math.sqrt(5)
	const A = Math.pow((1 + sqrt5) / 2, nth) / sqrt5
	const B = Math.pow((1 - sqrt5) / 2, nth) / sqrt5

	return Math.round(A + B)
}

const MEMO = new Map()

function main() {
	const len = Number.parseInt(num, 10)

	const iccanobiFSequence = Array.from({ length: len }, (_, i) => {
		const nth = len - i
		if (!MEMO.has(nth)) MEMO.set(nth, binetFormule(nth))

		return MEMO.get(nth)
	})

	console.log(iccanobiFSequence.join(" "))
}

main()
