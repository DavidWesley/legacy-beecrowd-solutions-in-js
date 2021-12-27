/**
 *  FUNC   |   CALLS   | VALUE |
 * fib( 0) =   0 calls =   0
 * fib( 1) =   0 calls =   1
 * fib( 2) =   2 calls =   1
 * fib( 3) =   4 calls =   2
 * fib( 4) =   8 calls =   3
 * fib( 5) =  14 calls =   5
 * fib( 6) =  24 calls =   8
 * fib( 7) =  40 calls =   13
 * fib( 8) =  66 calls =   21
 * fib( 9) = 108 calls =   34
 * fib(10) = 176 calls =   55
 */

/**
 * Call FIB function:
 * * C(n) = [ (n - 2 > 0) ? ( C(n - 2) + 1 ) : (return 0) ) ] + [ (n - 1 > 0) ? C(n - 1) + 1 : (return 0) ]
 * * F(n) = F(n - 2) + F(n - 1)
 */

const { readFileSync } = require("fs")
const [numCases, ...nthFibonacciList] = readFileSync("/dev/stdin", "utf8").split("\n")

/** @typedef {{ calls: number, value: number }} countableFibProp */

/** @type { Map<number, countableFibProp> } */
const fibonacciList = new Map()

fibonacciList.set(0, { calls: 0, value: 0 })
fibonacciList.set(1, { calls: 0, value: 1 })
fibonacciList.set(2, { calls: 2, value: 1 })

function recusiveFibonacciWithCallsCounter(nth = 0) {
	nth = Math.max(0, nth) // is nth leq 0? So set nth to 0

	if (fibonacciList.has(nth) === false) {
		// If not included, set it
		const fibA = recusiveFibonacciWithCallsCounter(nth - 2)
		const fibB = recusiveFibonacciWithCallsCounter(nth - 1)

		fibonacciList.set(nth, {
			calls: (fibA.calls && fibA.calls + 1) + (fibB.calls && fibB.calls + 1),
			value: fibA.value + fibB.value
		})
	}

	return fibonacciList.get(nth)
}

function main() {
	const responses = nthFibonacciList.slice(0, +numCases).map((nthFib) => {
		const { calls, value } = recusiveFibonacciWithCallsCounter(Number.parseInt(nthFib, 10))
		return `fib(${nthFib}) = ${calls} calls = ${value}`
	})

	console.log(responses.join("\n"))
}

main()