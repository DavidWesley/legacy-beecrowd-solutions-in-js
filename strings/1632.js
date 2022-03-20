const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toUpperCase()
const VariationsNumMap = new Map(ALPHABET.split("").map(char => [char, 2]))

VariationsNumMap.set("A", 3) // Special Cases -> [A, a, 4]
VariationsNumMap.set("E", 3) // Special Cases -> [E, e, 3]
VariationsNumMap.set("I", 3) // Special Cases -> [I, i, 1]
VariationsNumMap.set("O", 3) // Special Cases -> [O, o, 0]
VariationsNumMap.set("S", 3) // Special Cases -> [S, s, 5]

function countVariations(word = "") {
	return word.split("").reduce((sum, char) => sum * (VariationsNumMap.get(char.toUpperCase()) || 1), 1)
}

function main() {
	const responses = lines.slice(0, +numLines).map(countVariations)
	console.log(responses.join("\n"))
}

main()