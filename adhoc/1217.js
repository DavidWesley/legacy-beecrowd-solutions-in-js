const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n", 2 * 365 + 1)


function main() {
	const NUM_TEST_CASES_FROM_INPUT = Number.parseInt(input.shift(), 10)
	const output = []

	const total = {
		days: 0,
		price: 0,
		mass: 0
	}

	while (input.length > 0 && total.days <= NUM_TEST_CASES_FROM_INPUT) {
		const [[price], [...fruits]] = input.splice(0, 2).map(line => line.split(" "))

		total.days += 1
		total.price += Number.parseFloat(price)
		total.mass += fruits.length

		output.push(`day ${total.days}: ${fruits.length} kg`)
	}

	output.push(
		`${(total.mass / total.days).toFixed(2)} kg by day`,
		`R$ ${(total.price / total.days).toFixed(2)} by day`
	)

	console.log(output.join("\n"))
}

main()
