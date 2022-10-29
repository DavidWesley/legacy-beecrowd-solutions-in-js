const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(value => Number.parseInt(value, 10))

/**
 * @param {number} productID
 * @param {number} quantity
 * @param {Map<number, number>} products
 */
function cost(productID, quantity, products) {
	const price = products.get(productID)
	const value = price * quantity
	return value
}

function main() {
	const [code, quantities] = input
	const products = new Map([[1, 4.00], [2, 4.50], [3, 5.00], [4, 2.00], [5, 1.50]]) // Map [[ID, value]]
	const total = cost(code, quantities, products)

	console.log("Total: R$ %s", total.toFixed(2))
}

main()
