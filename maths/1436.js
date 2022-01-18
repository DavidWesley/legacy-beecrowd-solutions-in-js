const { format } = require("util")
const { readFileSync } = require("fs")

const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

function main() {
	const size = Number.parseInt(numLines, 10)
	const responses = new Array(size)

	for (let index = 0; index < size; index++) {
		const [num, ...ages] = lines[index].map((value) => Number.parseInt(value, 10))

		responses[index] = format("Case %d: %d", index + 1, ages[Math.trunc(num / 2)])
	}

	console.log(responses.join("\n"))
}

main()