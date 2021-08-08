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
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const numTestCases = input.shift()
const [...nthFibonacciList] = input.map(Number)

const fibonacciList = new Map()
fibonacciList.set(0, { call: 0, value: 0 })
fibonacciList.set(1, { call: 0, value: 1 })
fibonacciList.set(2, { call: 2, value: 1 })

function fibonacci(n = 0) {
	if (n < 0) return 0
	else if (fibonacciList.has(n)) return fibonacciList.get(n)

	const fibA = fibonacci(n - 2)
	const fibB = fibonacci(n - 1)

	fibonacciList.set(n, {
		call: (fibA !== 0 ? fibA.call + 1 : 0) + (fibB !== 0 ? fibB.call + 1 : 0),
		value: (fibA !== 0 ? fibA.value : 0) + (fibB !== 0 ? fibB.value : 0)
	})

	return fibonacciList.get(n)
}

function main() {
	const responses = []

	for (const [index, nthfibonacci] of Object.entries(nthFibonacciList)) {
		if (numTestCases === index) break
		const { call, value } = fibonacci(nthfibonacci)
		responses.push(`fib(${nthfibonacci}) = ${call} calls = ${value}`)
	}

	console.log(responses.join('\n'))
}

main()