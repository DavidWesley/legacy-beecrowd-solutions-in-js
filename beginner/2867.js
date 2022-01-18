const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

function main() {
	const responses = lines
		.slice(0, +numCases)
		.map(([N, M]) => {
			return Math.floor(Number.parseInt(M, 10) * Math.log10(Number.parseInt(N, 10))) + 1
		})

	console.log(responses.join("\n"))
}

main()