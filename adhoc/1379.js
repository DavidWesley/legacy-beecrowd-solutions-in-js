const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map((line) => line.split(" "))

function main() {
	const responses = []

	for (const [A, B] of input) {
		if (A === "0" && B === "0") break
		responses.push(2 * (+A) - (+B))
	}

	console.log(responses.join("\n"))
}

main()