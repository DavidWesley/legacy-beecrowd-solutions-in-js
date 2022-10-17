const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 2))


function sumOperationCarryCounter(numA = 0, numB = 0) {
	const len = Math.ceil(Math.max(
		Math.log10(numA),
		Math.log10(numB)
	))

	const strA = numA.toString(10).padStart(len, "0")
	const strB = numB.toString(10).padStart(len, "0")

	let counter = 0

	for (let index = len - 1, draw = 0; index >= 0; index--) {
		const dA = Number.parseInt(strA.charAt(index), 10)
		const dB = Number.parseInt(strB.charAt(index), 10)

		if (dA + dB >= 10 - draw) { draw = 1; counter += 1 }
		else { draw = 0 }
	}

	return counter
}


function main() {
	const output = []

	for (const [A, B] of input) {
		if (A === "0" && B === "0") break
		const carriesQuantity = sumOperationCarryCounter(A, B)

		if (carriesQuantity === 0) output.push("No carry operation.")
		else if (carriesQuantity === 1) output.push("1 carry operation.")
		else output.push(`${carriesQuantity} carry operations.`)
	}

	console.log(output.join("\n"))
}

main()
