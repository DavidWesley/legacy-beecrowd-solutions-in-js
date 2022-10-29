const Float = (num, precision) => Number.parseFloat(num.toFixed(precision))

const { readFileSync } = require("node:fs")
const [A, B] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(Number.parseFloat)
	.map(value => Float(value, 1))

function main() {
	const average = (A * 0.35 + B * 0.75) * 10 / 11
	console.log("MEDIA = %s", average.toFixed(5))
}

main()
