const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => Number.parseInt(line, 10))

function sumRangeFromSize(start = 0, size = 1, step = 1) {
	const end = start + step * (size - 1)
	return 0.5 * size * (start + end)
}

function main() {
	const responses = Array.from({ length: numLines }, (_, index) => 1 + sumRangeFromSize(1, lines[index], 1))
	console.log(responses.join("\n"))
}

main()
