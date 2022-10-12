const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const output = []

	for (const line of input) {
		if (line === "") break // EOFile Condition

		const words = line.match(/\b[A-Za-z]+\.?\b/g) || []
		const averageWordsLen = words.length === 0 ?
			0 :
			Math.trunc(words.reduce((len, word) => len + word.length, 0) / words.length)

		if (averageWordsLen <= 3) output.push(250)
		else if (averageWordsLen === 4 || averageWordsLen === 5) output.push(500)
		else if (averageWordsLen >= 6) output.push(1000)
	}

	console.log(output.join("\n"))
}

main()
