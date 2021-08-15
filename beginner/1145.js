const { readFileSync } = require("fs")
const [X, Y] = readFileSync("./dev/stdin", "utf8").split(" ")

function chunkArray(myArray = [], chunkSize = myArray.length) {
	const results = []
	while (myArray.length > 0) results.push(myArray.splice(0, chunkSize))
	return results
}

function main() {
	const responses = []

	const size = Number.parseInt(X)
	const total = Number.parseInt(Y)

	const model = Array.from({ length: total }, (_, i) => i + 1)
	const chunksArr = chunkArray(model, size)

	for (const chunk of chunksArr) responses.push(chunk.join(" "))

	console.log(responses.join("\n"))
}

main()