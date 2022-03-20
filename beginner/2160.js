const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const isValidName = (name = "") => name.length > 80

function main() {
	const name = input.shift()
	console.log(isValidName(name) ? "YES" : "NO")
}

main()