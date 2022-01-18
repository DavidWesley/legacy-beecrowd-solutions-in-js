const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => Number.parseInt(line, 10))

const MEMO = new Map([
	[0, 0n],
	[1, 1n],
])

function reverseDigits(num = 0n, base = 10, bits = 64) {
	return BigInt.asUintN(
		bits,
		BigInt(num.toString(base).split("").reverse().join(""))
	)
}

/** @param {number} index */

function mirroring(index) {
	if (index <= 0) return 0n
	if (index == 1) return 1n
	if (index == 2) return 2n

	const prevA = index - 1
	const prevB = index - 2

	if (!MEMO.has(prevA)) MEMO.set(prevA, mirroring(prevA))
	if (!MEMO.has(prevB)) MEMO.set(prevB, mirroring(prevB))

	return reverseDigits(MEMO.get(prevA)) + reverseDigits(MEMO.get(prevB))
}

function main() {
	const responses = []

	for (const nth of input)
		if (isNaN(nth)) break
		else responses.push(mirroring(nth))

	console.log(responses.join("\n"))
}

main()
