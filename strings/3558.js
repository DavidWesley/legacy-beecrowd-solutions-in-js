const { readFileSync } = require("fs")
const [numLines, ...surnames] = readFileSync("/dev/stdin", "utf8").split("\n")

const isADifficultSurname = (surname = "") => /((?![aeiou])[a-z]){3,}/si.test(surname)

function main() {
	const responses = surnames
		.slice(0, +numLines)
		.map(surname => `${surname}${isADifficultSurname(surname) ? " nao" : ""} eh facil`)

	console.log(responses.join("\n"))
}

main()