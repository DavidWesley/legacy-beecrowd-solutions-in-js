const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((value) => Number.parseInt(value, 10)))

function main() {
	const responses = []

	for (let step = 0; step < input.length; step++) {
		const [N] = input[2 * step]
		if (N === -1) break

		let sum = 0, count = 0
		const ticketsPrices = input[2 * step + 1]

		for (const price of ticketsPrices) {
			sum += price
			if (sum % 100 == 0) count++
		}

		responses.push(count)
	}

	console.log(responses.join("\n"))
}

main()