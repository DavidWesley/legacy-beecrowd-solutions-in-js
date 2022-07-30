const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const output = new Array()

	for (let index = 0; index < input.length; index += 2) {
		if (input[index] == "") break

		const [, L, C] = input[index].split(" ", 3).map(value => Number.parseInt(value, 10))
		const text = input[index + 1]

		const regex = RegExp(`\\b\\w[\\w ]{0,${C - 1}}\\b`, "gis")
		const numPages = Math.ceil(text.match(regex).length / L)

		output.push(numPages)
	}

	console.log(output.join("\n"))
}

main()