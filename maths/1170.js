const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function daysToFinishFood(food, tax) {
	if (food <= 0) return 1
	const exponent = Math.log(1 / food) / Math.log(tax)

	return Math.ceil(exponent)
}

function main() {
	const TAX = 0.5

	const foods = lines.slice(0, +numLines).map(Number.parseFloat)
	const messages = foods.map(food => `${daysToFinishFood(food, TAX)} dias`)

	console.log(messages.join("\n"))
}

main()