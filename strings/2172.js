const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")


function main() {
	const stopAtIndex = input.indexOf("0 0")
	const responses = input
		.slice(0, stopAtIndex)
		.map((str) => str.split(" ").map((value) => Number.parseInt(value, 10)))
		.map(([X, M]) => X * M)

	console.log(responses.join("\n"))
}

main()
