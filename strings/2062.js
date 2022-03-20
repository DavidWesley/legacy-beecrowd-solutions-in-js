const { readFileSync } = require("fs")
const [numTestCases, ...words] = readFileSync("/dev/stdin", "utf8").split(/\s/)

function fixWords(wordsArr = [""]) {
	return wordsArr.map(word => word.length === 3 && /^(OB|UR)/.test(word)
		? `${word.substr(0, 2)}I`
		: word
	)
}

function main() {
	const responses = fixWords(words.slice(0, +numTestCases))
	console.log(responses.join(" "))
}

main()