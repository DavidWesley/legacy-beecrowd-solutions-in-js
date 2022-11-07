const { readFileSync } = require("node:fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8").split("\n", 1e5 + 1)

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1
const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0

function main() {
	const output = input
		.splice(0, Number.parseInt(numLines, 10))
		.map(value => Number.parseInt(value, 10))
		.sort((a, b) => {
			if (isEven(a) && isOdd(b)) return -1
			else if (isOdd(a) && isEven(b)) return 1
			else if (isOdd(a) && isOdd(b)) return b - a
			else if (isEven(a) && isEven(b)) return a - b
			else return 0
		})

	console.log(output.join("\n"))
}

main()
