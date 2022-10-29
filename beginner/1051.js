const { readFileSync } = require("node:fs")
const [input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number.parseFloat)

const RangeConstructor = (value) => (min, max = Number.POSITIVE_INFINITY) => value === Math.min(Math.max(min, value), max)

function incomeTax(income) {
	if (isNaN(income) || income <= 0) return 0

	const inRange = RangeConstructor(income)

	if (inRange(0, 2000)) return 0
	else if (inRange(2000, 3000)) return 0.08 * (income - 2000) + incomeTax(2000)
	else if (inRange(3000, 4500)) return 0.18 * (income - 3000) + incomeTax(3000)
	else if (inRange(4500)) return 0.28 * (income - 4500) + incomeTax(4500)
	else return 0
}

const tax = incomeTax(input)
console.log(tax > 0 ? `R$ ${tax.toFixed(2)}` : "Isento")
