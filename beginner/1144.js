const { readFileSync } = require("fs")
const input = Number.parseInt(readFileSync("/dev/stdin", "utf8").split("\n")[0])

function chunkArray(myArray = [], chunkSize = myArray.length) {
	const results = []
	while (myArray.length > 0) results.push(myArray.splice(0, chunkSize))

	return results
}

function modelsArrays(limit = 0) {
	const results = []

	for (let value = 1; value <= limit; value++) {
		results.push(value, value ** 2, value ** 3)
		results.push(value, value ** 2 + 1, value ** 3 + 1)
	}

	return results
}

function main() {
	const responses = []

	const size = 3
	const model = modelsArrays(input)
	const chunksArr = chunkArray(model, size)

	for (const chunk of chunksArr) responses.push(chunk.join(" "))

	console.log(responses.join("\n"))
}

main()
