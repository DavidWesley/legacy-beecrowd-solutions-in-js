const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function convertStringToContinuosAlternatingCase(str = "", from = 0) {
	const arr = [...str]

	for (let index = from, toUpper = true; index < arr.length; index++) {
		const char = arr[index]
		if (/[a-z]/i.test(char)) {
			arr[index] = toUpper ? char.toUpperCase() : char.toLowerCase()
			toUpper = !toUpper
		}
	}

	return arr.join("")
}

function main() {
	const output = []

	for (const line of input)
		if (line == "") break // EOFile Condition
		else output.push(convertStringToContinuosAlternatingCase(line, 0))

	console.log(output.join("\n"))
}

main()
