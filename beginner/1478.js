const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (const size of input) {
		if (size === "0") break
		const table = []

		for (let i = 0; i < +size; i++) {
			const line = new Array(+size)

			for (let j = 0; j < +size; j++)
				line[j] = String(Math.abs(i - j) + 1).padStart(3, " ")

			table.push(line.join(" "))
		}

		responses.push(table.join("\n"))
	}

	console.log(`${responses.join("\n\n")}\n`)
}

main()
