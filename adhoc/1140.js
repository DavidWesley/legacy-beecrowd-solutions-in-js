const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function isTautogram(verse = "") {
	const initials = (verse.match(/\b\w/g) ?? []).map((char) => char.toUpperCase())
	return new Set(initials).size === 1
}

function main() {
	const responses = []

	for (const line of input)
		if (line === "*") break
		else responses.push(isTautogram(line) ? "Y" : "N")

	console.log(responses.join("\n"))
}

main()