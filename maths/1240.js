const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" "))

const fitFromEnd = (target, tail) => target.slice((-1) * tail.length) === tail

function main() {
	const responses = lines
		.slice(0, +numCases)
		.map(([a, b]) => fitFromEnd(a, b) ? "encaixa" : "nao encaixa")

	console.log(responses.join("\n"))
}

main()