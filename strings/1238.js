const { readFileSync } = require("fs")

const [[numCases], ...wordsPairsList] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(words => words.split(" "))

function replaceAndJoinWords([first, last]) {
	return Array
		.from({ length: Math.max(first.length, last.length) }, (_, i) => `${first.charAt(i)}${last.charAt(i)}`)
		.join("")
}

function main() {
	const responses = wordsPairsList
		.slice(0, +numCases)
		.map(([firstWord, lastWord]) => replaceAndJoinWords([firstWord, lastWord]))

	console.log(responses.join("\n"))
}

main()