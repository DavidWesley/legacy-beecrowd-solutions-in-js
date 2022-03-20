const { readFileSync } = require("fs")
const [message] = readFileSync("/dev/stdin", "utf8").split("\n")

const reverseStr = str => [...str].reverse().join("")

function main() {
	const [longNumber] = message.match(/\d+/g)
	const reverseLongNumber = reverseStr(longNumber)

	console.log(reverseLongNumber)
}

main()
