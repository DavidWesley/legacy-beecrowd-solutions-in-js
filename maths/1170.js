const { readFileSync } = require("node:fs")
const [N, ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1000 + 1)
	.map(Number.parseFloat)

const daysToFinishFood = (food, tax) => (food <= 0) ? 1 : Math.ceil(Math.log(1 / food) / Math.log(tax))

const output = Array
	.from({ length: N }, (_, i) => input[i])
	.map(food => daysToFinishFood(food, 0.5))
	.map(days => `${days} dias`)

console.log(output.join("\n"))
