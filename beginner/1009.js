const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const name = input.shift()
const [fixedSalary, sales] = input.map(value => Number.parseFloat(value))

function finalSalary(salary = 0, sales = 0) {
	const finalSal = salary + sales * 0.15
	return finalSal.toFixed(2)
}

function main() {
	const finalSalaryValue = finalSalary(fixedSalary, sales)

	console.log(name)
	console.log(`TOTAL = R$ ${finalSalaryValue}`)
}

main()