const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(line => line.split(" "))

const excludeZeros = (num) => String(num).replace(/[0]/g, "")

function main() {
	const responses = []

	for (const [A, B] of input) {
		if (A === "0" || B === "0") break // EOFile Condition

		const sum = Number.parseInt(A, 10) + Number.parseInt(B, 10)
		const nonZeros = excludeZeros(sum)

		responses.push(nonZeros)
	}

	console.log(responses.join("\n"))
}

main()