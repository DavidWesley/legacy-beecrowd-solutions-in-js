const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	for (let i = 0; i < input.length; i += 2) {
		if (input[i] == "0") break

		console.log("Teste %d", (i / 2) + 1)
		console.log(eval(input[i + 1]))
		console.log("")
	}
}

main()