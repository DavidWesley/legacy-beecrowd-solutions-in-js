const { readFileSync } = require("node:fs")

const [size, ...input] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/, 1 + 100)
	.map(value => Number.parseInt(value, 10))

function main() {
	let firstVelocityReductionIndex = 0

	for (let index = 1; index < input.length && index <= size; index += 1) {
		if (input[index - 1] > input[index]) {
			firstVelocityReductionIndex = index + 1
			break
		}
	}

	console.log(firstVelocityReductionIndex)
}

main()
