const { readFileSync } = require("fs")
const [word] = readFileSync("/dev/stdin", "utf8").split("\n")

const getWordType = (str = "") => str.length >= 10 ? "palavrao" : "palavrinha"

function main() {
	const response = getWordType(word)
	console.log(`${response}`)
}

main()
