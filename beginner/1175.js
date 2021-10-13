const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").slice(0, 20)

function main() {
	const responses = []

	input.reverse().forEach((value, index) => {
		responses.push(`N[${index}] = ${value}`)
	})

	console.log(`${responses.join("\n")}`)
}

main()
