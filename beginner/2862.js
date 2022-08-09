const { readFileSync } = require("fs")
const [numLines, ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(value => Number.parseInt(value, 10))

function main() {
	const output = Array.from(
		{ length: numLines },
		(_, index) => input[index] <= 8000 ? "Inseto!" : "Mais de 8000!"
	)

	console.log(output.join("\n"))
}

main()