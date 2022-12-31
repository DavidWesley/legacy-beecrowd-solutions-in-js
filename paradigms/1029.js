const { format } = require("node:util")
const { readFileSync } = require("node:fs")
const [N, ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(value => Number.parseInt(value, 10))

/*
┌─────┬───────┬───────┐
│ FIB │ CALLS │ VALUE │
├─────┼───────┼───────┤
│  0  │   0   │   0   │
│  1  │   0   │   1   │
│  2  │   2   │   1   │
│  3  │   4   │   2   │
│  4  │   8   │   3   │
│  5  │   14  │   5   │
│  6  │   24  │   8   │
│  7  │   40  │   13  │
│  8  │   66  │   21  │
│  9  │  108  │   34  │
│  10 │  176  │   55  │
└─────┴───────┴───────┘
*/

/**
 * @param {number} nth
 * @param {Map<number, { calls: number, value: number }>} memo
 */
function recursiveFibonacciWithCallsCounter(nth = 0, memo) {
	nth = Math.floor(Math.max(0, nth)) // is nth leq 0? So set nth to 0

	if (memo.has(nth) === false) {
		const fibA = recursiveFibonacciWithCallsCounter(nth - 2, memo)
		const fibB = recursiveFibonacciWithCallsCounter(nth - 1, memo)

		memo.set(nth, {
			calls: (fibA.calls + 1) + (fibB.calls + 1),
			value: fibA.value + fibB.value
		})
	}

	return memo.get(nth)
}

function main() {
	const MEMO = new Map([
		[0, { calls: 0, value: 0 }],
		[1, { calls: 0, value: 1 }],
		[2, { calls: 2, value: 1 }]
	])

	const output = new Array(N)

	for (let index = 0; index < N; index += 1) {
		const nth = input[index]
		const { calls, value } = recursiveFibonacciWithCallsCounter(nth, MEMO)
		output[index] = format("fib(%d) = %d calls = %d", nth, calls, value)
	}

	console.log(output.join("\n"))
}

main()
