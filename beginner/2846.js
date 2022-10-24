const { readFileSync } = require("node:fs")
const [input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

function* fibonacci() {
	let a = 0n
	let b = 1n

	while (true) {
		[a, b] = [b, a + b]
		yield a
	}
}

function* fibonot(nth = 0) {
	let res = 0n
	let fib = fibonacci()
	let min, max = fib.next().value

	outer:
	while (true) {
		min = max
		max = fib.next().value

		// @ts-ignore
		for (res = min + 1n; res < max; res++) {
			yield res
			if (--nth <= 0) break outer
		}
	}

	fib.return()
	return res
}

function main() {
	const kthFibonot = [...fibonot(input)].pop().toString(10)
	console.log(kthFibonot)
}

main()
