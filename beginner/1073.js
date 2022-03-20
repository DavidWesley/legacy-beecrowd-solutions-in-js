const { readFileSync } = require("fs")
const num = Number.parseInt(readFileSync("/dev/stdin", "utf8").split("\n").shift(), 10)

function main() {
	const responses = []

	for (let i = 2; i <= num; i += 2)
		responses.push(`${i}^2 = ${i ** 2}`)

	console.log(responses.join("\n"))
}

main()