const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")

function main() {
	const passwordList = input.split("\n")
	const properPasswords = passwordList.map(pass => Number.parseInt(pass) - 1)

	console.log(properPasswords.join("\n"))
}

main()
