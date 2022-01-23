const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const menu = new Map([
	["1001", 1.5],
	["1002", 2.5],
	["1003", 3.5],
	["1004", 4.5],
	["1005", 5.5],
])

function main() {
	const totalPrice = lines.slice(0, +numCases).reduce((total, line) => {
		const [prodCode, quantity] = line.split(" ")
		return total + +quantity * menu.get(prodCode)
	}, 0)

	console.log(totalPrice.toFixed(2))
}

main()
