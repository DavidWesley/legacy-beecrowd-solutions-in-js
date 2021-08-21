const { readFileSync } = require("fs")
const [num] = readFileSync("/dev/stdin", "utf8").split('\n')

function main() {
	const decimaNumber = Number.parseInt(num, 10)
	const hexadecimalString = decimaNumber.toString(16)

	console.log(hexadecimalString.toUpperCase())
}

main()