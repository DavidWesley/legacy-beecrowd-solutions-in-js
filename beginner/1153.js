const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function fact(num = 0) {
	let returnedValue = 1
	for (let f = 2; f <= num; f++) returnedValue *= f
	return Number.isSafeInteger(returnedValue) ? returnedValue : BigInt(returnedValue)
}

function main() {
	const N = Number.parseInt(input.shift())
	console.log(fact(N))
}

main()