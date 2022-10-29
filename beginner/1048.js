const { readFileSync } = require("node:fs")
const [input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number.parseFloat)

function getReadjustmentRate(currentSalary) {
	const inRange = ((value) => (min, max = value) => value === Math.min(Math.max(min, value), max))(currentSalary)

	if (inRange(0, 400.00)) return 0.15
	else if (inRange(400.01, 800.00)) return 0.12
	else if (inRange(800.01, 1200.00)) return 0.10
	else if (inRange(1200.01, 2000.00)) return 0.07
	else if (inRange(2000)) return 0.04
	else return 0
}

function updateSalary(currentSalary = 0) {
	const readjustmentRate = getReadjustmentRate(currentSalary)
	const updatedSalary = currentSalary * (1 + readjustmentRate)

	return {
		updatedSalary,
		readjustmentRate,
		readjustValue: updatedSalary - currentSalary
	}
}

function main() {
	const status = updateSalary(input)

	console.log(`Novo salario: ${status.updatedSalary.toFixed(2)}`)
	console.log(`Reajuste ganho: ${status.readjustValue.toFixed(2)}`)
	console.log(`Em percentual: ${Math.trunc(status.readjustmentRate * 100.00)} %`)
}

main()
