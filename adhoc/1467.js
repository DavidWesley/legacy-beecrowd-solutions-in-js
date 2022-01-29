const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

const PLAYERS = ["A", "B", "C"]

function main() {
	const responses = []

	for (const line of lines) {
		if (line.includes("")) break // EOF

		if (line.every(value => value === "0") || line.every(value => value === "1")) responses.push("*")
		else if (line.filter(value => value == "1").length == 1) responses.push(PLAYERS[line.indexOf("1")])
		else if (line.filter(value => value == "0").length == 1) responses.push(PLAYERS[line.indexOf("0")])
	}

	console.log(responses.join("\n"))
}

main()