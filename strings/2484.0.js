const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

for (const word of input) {
	if (word === "") break // EOFile Condition Verification

	let triangle = ""

	for (let i = 0; i < word.length; i++) {
		const k = []

		for (let j = 0; j < word.length - i; j++) {
			k[j] = word[j]
		}

		triangle += " ".repeat(i) + k.join(" ") + "\n"
	}

	console.log(triangle)
}