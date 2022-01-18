const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (let index = 0; index < lines.length; index += 2) {
		const DNA = lines[index]
		const geneticCode = lines[index + 1]

		if (DNA == "") break
		else responses.push(DNA.includes(geneticCode) ? "Resistente" : "Nao resistente")
	}

	console.log(responses.join("\n"))
}

main()