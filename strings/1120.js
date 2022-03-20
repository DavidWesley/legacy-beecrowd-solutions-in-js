const { readFileSync } = require("fs")
const pairs = readFileSync("/dev/stdin", "utf8").split("\n").map(pair => pair.split(" "))

function formatValueByDigit(value, digit) {
	const formatedValue = [...value.replace(RegExp(digit, "g"), "")]
	let size = formatedValue.length

	for (let i = 0; i < size - 1; i++) {
		if (formatedValue[i] !== "0") break
		for (let j = 1; j < size; j++) formatedValue[j] = formatedValue[j + 1]

		formatedValue.pop()
		size -= 1; i -= 1
	}

	if (size === 0) formatedValue.push("0")
	return formatedValue.join("")
}

function main() {
	const responses = []

	for (const [digit, value] of pairs) {
		if (digit === "0" && value === "0") break
		const resultingValue = formatValueByDigit(value, digit)
		responses.push(resultingValue)
	}

	console.log(responses.join("\n"))
}

main()