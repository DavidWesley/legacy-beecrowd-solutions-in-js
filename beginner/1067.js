const { readFileSync } = require("node:fs")
const [L] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number)

function main() {
	const output = []
	for (let num = 1; num <= L; num += 2)
		output.push(num)

	console.log(output.join("\n"))
}

main()
