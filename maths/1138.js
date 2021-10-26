const { readFileSync } = require("fs")

const input = readFileSync("/dev/stdin", "utf8").split('\n').map(line => {
	const [A, B] = line.split(' ')
	return [Number.parseInt(A, 10), Number.parseInt(B, 10)]
})

/**
 * @param {number} num
 * @param {number} digit
 * @returns {number}
 */

function occurrences(num, digit) {
	const K = Math.trunc(Math.log10(num))

	if (K === 0) return num >= digit ? 1 : 0

	const tenPowK = Math.pow(10, K)
	const tenPowKMinus1 = tenPowK / 10

	const A = Math.trunc(num / tenPowK)
	const B = num % tenPowK

	if (A < digit) return (A * K) * tenPowKMinus1 + (B === 0 ? 0 : occurrences(B, digit))
	else if (A === digit) return (A * K) * tenPowKMinus1 + 1 + (B === 0 ? 0 : occurrences(B, digit)) + B
	else if (A > digit) return (A * K + 10) * tenPowKMinus1 + (B === 0 ? 0 : occurrences(B, digit))

	return 0
}

/** @param {number} num */

function totalDigits(num) {
	if (num < 10) return num + 1

	const K = Math.trunc(Math.log10(num))
	const tenPowK = Math.pow(10, K)

	const A = Math.trunc(num / tenPowK)
	const B = num % tenPowK

	let sum = 0

	for (let s = 1; s <= K; s++)
		sum += 9 * s * Math.pow(10, s - 1)

	return (K + 1) * (B + 1 + (A - 1) * tenPowK) + sum + 1
}

/**
 * @param {number} num
 * @returns {number[]}
 */

function countOccurrences(num) {
	const counter = Array(10).fill(0)

	for (let d = 1; d < 10; d++)
		counter[d] = occurrences(num, d)

	// Tratamento especial para o ZERO:

	const dSum = counter.reduce((sum, value) => value + sum, 0)
	counter[0] = totalDigits(num) - dSum

	return counter
}


// OPTIMIZATION TEST
const memo = {}

function main() {
	const responses = []

	for (const [A, B] of input) {
		if (A === 0 && B === 0) break // EOFile Condition

		const X = A !== 0 ? A - 1 : 0 // For Zero Value we need of this Special Tratament
		const Y = B // Reatribuição desnecessária

		const min = memo[X] || countOccurrences(X)
		const max = memo[Y] || countOccurrences(Y)

		if (!Boolean(X in memo)) memo[X] = min // Trying optimazing
		if (!Boolean(Y in memo)) memo[Y] = max // Trying optimazing

		const result = Array.from({ length: 10 }, (_, i) => max[i] - min[i])

		responses.push(result.join(' '))
	}

	console.log(`${responses.join('\n')}`)
}

main()