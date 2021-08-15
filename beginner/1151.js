const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")

function FibonacciList(size = 0) {

	const fibonacciList = new Map()
		.set(0, { value: 0 })
		.set(1, { value: 1 })
		.set(2, { value: 1 });

	(function fibonacci(nth = 0) {
		if (nth < 0) return 0
		if (fibonacciList.has(nth)) return fibonacciList.get(nth)

		const fibA = fibonacci(nth - 2)?.value ?? 0
		const fibB = fibonacci(nth - 1)?.value ?? 0

		fibonacciList.set(nth, { value: fibA + fibB })

		return fibonacciList.get(nth)

	}(size = (size < 0) ? 0 : (size > 50) ? 50 : size))

	return function nthFirstFibonnaciValues(nth = 0) {
		nth = (nth > size) ? size : (nth < 0) ? 0 : nth
		const valuesList = Array.from(fibonacciList.values(), ({ value }) => value)

		return valuesList.slice(0, nth)
	}
}

function main() {
	const size = Number.parseInt(input)
	const fibList = FibonacciList(size)
	const firstFibValuesArr = fibList(size)

	console.log(firstFibValuesArr.join(' '))
}

main()