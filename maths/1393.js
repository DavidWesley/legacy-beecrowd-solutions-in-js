const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function binetFormule(nth) {
	if (nth < 0) return 0
	const sqrt5 = Math.sqrt(5)
	const nthPower = (equation) => Math.pow(equation / 2, nth) / sqrt5

	return Math.round(nthPower(1 + sqrt5) - nthPower(1 - sqrt5))
}

function main() {
	const responses = []

	for (let i = 0; i < input.length; i++) {
		if (input[i] == "0") break // EOF
		else responses.push(binetFormule(Number.parseInt(input[i], 10) + 1))
	}

	console.log(responses.join("\n"))
}

main()
