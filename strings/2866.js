const { readFileSync } = require("fs")
const [numTestCases, ...criptedTexts] = readFileSync("/dev/stdin", "utf8").split("\n")

const reverseStr = str => [...str].reverse().join("")
const extractLowersChars = (str = "") => str.replace(/[^a-z]+/g, "")

function main() {
	const responses = criptedTexts
		.slice(0, +numTestCases)
		.map(criptedText => reverseStr(extractLowersChars(criptedText)))

	console.log(responses.join("\n"))
}

main()