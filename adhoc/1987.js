const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(line => line.split(" "))

/** @param {string | number} num */
const isMultipleOf3 = (num = "") => BigInt(num) % 3n === 0n

/** @param {string | number} digits */
const sumDigits = (digits) => [...String(digits)].map(Number).reduce((sum, digit) => sum + digit, 0)

function main() {
	const responses = []

	for (const [, num = ""] of input)
		if (num === "") break
		else responses.push(`${sumDigits(num)} ${isMultipleOf3(num) ? "sim" : "nao"}`)

	console.log(responses.join("\n"))
}

main()