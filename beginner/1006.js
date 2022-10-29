const Float = (num, precision) => Number.parseFloat(num.toFixed(precision))

const { readFileSync } = require("node:fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 3)
	.map(Number.parseFloat)
	.map(value => Float(value, 1))

function main() {
	const average = (A * 0.2) + (B * 0.3) + (C * 0.5)
	console.log("MEDIA = %s", average.toFixed(1))
}

main()
