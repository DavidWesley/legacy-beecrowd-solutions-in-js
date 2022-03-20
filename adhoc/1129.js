const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function filledOrEmpty(shade) {
	const inRange = ((value) => (min, max = value) => value === Math.min(Math.max(min, value), max))(+shade)

	if (inRange(0, 127)) return "B"
	else if (inRange(128, 255)) return "W"
	else return ""
}

const output = []
const AlternativesEnum = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E" }

while (input.length > 0) {
	const numQuestions = Number.parseInt(input.shift(), 10)

	if (numQuestions == 0) break

	const questions = input.splice(0, numQuestions).map(quest => quest.split(" ").map(filledOrEmpty))

	for (const quest of questions) {
		if (quest.filter(alt => alt == "B").length != 1) output.push("*")
		else output.push(AlternativesEnum[quest.indexOf("B")])
	}
}

console.log(output.join("\n"))