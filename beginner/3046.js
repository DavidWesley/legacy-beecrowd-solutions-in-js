const { readFileSync } = require("fs")
const [num] = readFileSync("/dev/stdin", "utf8").split("\n")

const dominosQuant = (n) => (n + 1) * (n + 2) / 2

function main() {
	const N = Number.parseInt(num, 10)
	const dominos = dominosQuant(N)

	console.log(dominos)
}

main()