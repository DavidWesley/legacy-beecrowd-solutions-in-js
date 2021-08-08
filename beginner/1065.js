const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const [N1, N2, N3, N4, N5] = input.map((int) => parseInt(int))

const isEven = (num = 1) => Math.abs(Number(num)) % 2 === 0
const evenNumbersCounter = (...nums) => nums.filter(isEven).length

function main() {
	const evenNumbersQuantity = evenNumbersCounter(N1, N2, N3, N4, N5)
	console.log(`${evenNumbersQuantity} valores pares`)
}

main()