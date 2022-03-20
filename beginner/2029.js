const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(Number.parseFloat)

const PI = 3.14

while (input.length > 0) {
	const V = input.shift()
	const D = input.shift()

	const bArea = PI * (D ** 2) / 4.00

	console.log(`ALTURA = ${(V / bArea).toFixed(2)}`)
	console.log(`AREA = ${bArea.toFixed(5)}`)
}