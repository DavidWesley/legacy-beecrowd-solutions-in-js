const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	let longestWord = ""
	const responses = []

	for (const line of input) {
		if (line == "0") break

		const formattedLine = line.split(" ").map((word) => {
			let len = word.length
			if (len >= longestWord.length) longestWord = word
			return len
		}).join("-")

		responses.push(formattedLine)
	}

	console.log(responses.join("\n"))
	console.log(`\nThe biggest word: ${longestWord}`)
}

main()