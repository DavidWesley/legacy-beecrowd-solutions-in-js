const Float = (num, precision) => Number.parseFloat(num.toFixed(precision))

const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n", 3)
	.map(Number.parseFloat)
	.map(value => Float(value, 2))

function main() {
	const [employeeNumber, workedTimeInHours, tax] = input
	const salary = tax * workedTimeInHours

	console.log("NUMBER = %s", employeeNumber.toFixed(1))
	console.log("SALARY = U$ %s", salary.toFixed(2))
}

main()
