const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split("\n")

function timesTable(integerNum, multMax = 10) {
	return Array.from({ length: multMax }, (_, i) => {
		return `${i + 1} x ${integerNum} = ${integerNum * (i + 1)}`
	})
}

function main() {
	const integer = parseInt(input.shift())
	const responses = timesTable(integer, 10)

	console.log(responses.join("\n"))
}

main()
