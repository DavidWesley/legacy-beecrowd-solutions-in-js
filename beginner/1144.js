const { readFileSync } = require("fs")

const [size] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number.parseFloat)

function main() {

	const output = []

	for (let value = 1; value <= size; value++) {
		output.push([value, value ** 2, value ** 3])
		output.push([value, value ** 2 + 1, value ** 3 + 1])
	}

	console.log(
		output
			.map(chunk => chunk.join(" "))
			.join("\n")
	)
}

main()
