const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []
	const mod = Number.parseInt(input[0], 10)

	for (let index = 0; index < 1e3; index++) {
		responses.push(`N[${index}] = ${index % mod}`)
	}

	console.log(responses.join("\n"))
}

main()
