const { readFileSync } = require("fs")
const [L, C] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(value => Number.parseInt(value, 10))

function main() {
	const typeAFloorsQuantity = (L * C) + (L - 1) * (C - 1)
	const typeBFloorsQuantity = 2 * ((L - 1) + (C - 1))
	// const typeCFloorsQuantity = 4

	console.log("%d\n%d", typeAFloorsQuantity, typeBFloorsQuantity)
}

main()