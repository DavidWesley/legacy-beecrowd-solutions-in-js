const { readFileSync } = require("fs")
const [num] = readFileSync("/dev/stdin", "utf8").split(/\s+/)

function binetFormule(nth) {
	if (nth < 0) return 0
	const sqrt5 = Math.sqrt(5)
	const nthPower = (equation) => Math.pow(equation / 2, nth) / sqrt5

	return Math.round(nthPower(1 + sqrt5) - nthPower(1 - sqrt5))
}

const MEMO = new Map()

function main() {
	const len = Number.parseInt(num, 10)

	const iccanobiFSequence = Array.from({ length: len }, (_, i) => {
		const nth = len - i
		if (!MEMO.has(nth)) MEMO.set(nth, binetFormule(nth))

		return MEMO.get(nth)
	})

	console.log(`${iccanobiFSequence.join(" ")}`)
}

main()
