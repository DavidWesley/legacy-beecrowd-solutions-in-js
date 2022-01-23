const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")

const FULL_MESSAGE = "LIFE IS NOT A PROBLEM TO BE SOLVED"

function main() {
	const msg = FULL_MESSAGE.substring(0, +input)
	console.log(msg)
}

main()