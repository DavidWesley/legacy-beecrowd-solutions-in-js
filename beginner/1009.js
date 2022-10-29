const Float = (num, precision) => Number.parseFloat(num.toFixed(precision))

const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n", 3)

function main() {
	const name = input.shift()
	const salary = Float(input.shift(), 2)
	const sales = Float(input.shift(), 2)
	const updatedSalary = 0.15 * sales + salary

	console.log(name)
	console.log("TOTAL = R$ %s", updatedSalary.toFixed(2))
}

main()
