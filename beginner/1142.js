const { readFileSync } = require("fs")
const rows = Number.parseInt(readFileSync("/dev/stdin", "utf8").split("\n")[0])

function chunkArray(myArray = [], chunkSize = myArray.length) {
	const results = []
	while (myArray.length > 0) results.push(myArray.splice(0, chunkSize))

	return results
}

/**
 * @param {number} limit
 * @param {number} forEachNum
 * @param {string} replaceText
 */

function moldedArray(limit, forEachNum, replaceText = "") {
	const results = []

	for (let value = 1; value <= limit; value++)
		results.push(value % forEachNum === 0 ? replaceText : value)

	return results
}

function main() {
	const responses = []

	const size = 4
	const len = size * rows

	const model = moldedArray(len, size, "PUM")
	const chunksArr = chunkArray(model, size)

	for (const chunk of chunksArr)
		responses.push(chunk.join(" "))

	console.log(responses.join("\n"))
}

main()
