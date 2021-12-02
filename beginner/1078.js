const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function timesTable(num, max = 10) {
	return Array.from({ length: max }, (_, i) => {
		return `${i + 1} x ${num} = ${num * (i + 1)}`
	})
}

function main() {
	const integer = Number.parseInt(input.shift())
	const responses = timesTable(integer, 10)

	console.log(responses.join("\n"))
}

main()
