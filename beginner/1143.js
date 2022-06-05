const { readFileSync } = require("fs")

const [size] = readFileSync("../dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number.parseFloat)

function main() {

	const output =
		Array.from({ length: size }, (_, index) => {
			const value = index + 1
			return [value, value ** 2, value ** 3]
		})

	console.log(
		output
			.map(chunk => chunk.join(" "))
			.join("\n")
	)
}

main()