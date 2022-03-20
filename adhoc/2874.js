const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const BinFormmater = new Intl.NumberFormat("en-US", {
	useGrouping: false,
	minimumIntegerDigits: 8,
	maximumFractionDigits: 0,
})

while (input.length > 0) {
	const line = input.shift()
	if (line == "") break

	const quantities = Number.parseInt(line, 10)

	const binaries = input
		.splice(0, quantities)
		.map(BinFormmater.format)
		.map(bin => Number.parseInt(bin, 2))

	console.log(String.fromCharCode(...binaries))
}