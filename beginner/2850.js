const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const ParrotLegsStateEnum = {
	"esquerda": "ingles",
	"direita": "frances",
	"nenhuma": "portugues",
	"as duas": "caiu"
}

const output = []

while (input.length > 0) {
	const state = input.shift()
	if (state == "") break // EOFile Condition

	output.push(ParrotLegsStateEnum[state])
}

console.log(output.join("\n"))