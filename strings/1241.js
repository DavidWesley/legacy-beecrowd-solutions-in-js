const { readFileSync } = require("fs")

const [[numCases], ...pairTextList] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

function fitIn([firstValueString = "", secondValueString = ""]) {
	const diffLength = firstValueString.length - secondValueString.length

	if (diffLength < 0) return false
	else return firstValueString.substr(diffLength) === secondValueString
}

function main() {
	const responses = pairTextList
		.slice(0, +numCases)
		.map(([firstValue, secondValue]) => fitIn([firstValue, secondValue]) ? "encaixa" : "nao encaixa")

	console.log(responses.join("\n"))
}

main()