const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (const claim of input) {
		if (claim == "") break // EOFile
		else if (claim === "0") responses.push("vai ter copa!")
		else responses.push("vai ter duas!")
	}

	console.log(responses.join("\n"))
}

main()