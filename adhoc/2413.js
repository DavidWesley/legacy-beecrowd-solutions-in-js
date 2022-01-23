const { readFileSync } = require("fs")
const [clicks] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const numClicks = Number.parseInt(clicks, 10)
	const numClicksOnFirstLink = numClicks * 4

	console.log(numClicksOnFirstLink)
}

main()