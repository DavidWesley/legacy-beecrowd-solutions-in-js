const Float = (num, precision) => Number.parseFloat(num.toFixed(precision))

const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(line => line.split(" ", 3).map(Number))

function pay(part) {
	const [, num, cost] = part
	const total = Float(num * cost, 2)
	return total
}

/** @param {number[]} parts */
function cost(parts = []) {
	return parts.reduce((total, value) => total + value, 0)
}

function main() {
	const total = cost(input.map(pay))
	console.log("VALOR A PAGAR: R$ %s", total.toFixed(2))
}

main()
