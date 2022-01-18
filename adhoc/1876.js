const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

function longestFillet(ribbon = "") {
	const cords = ribbon.split("x").map((str) => str.length) || [0]

	const last = cords.pop() || 0
	const first = cords.shift() || 0
	const others = cords.map((len) => Math.floor(len / 2))

	return Math.max(first, ...others, last)
}

function main() {
	const responses = []

	for (const cipo of lines)
		if (cipo === "") break
		else responses.push(longestFillet(cipo))

	console.log(responses.join("\n"))
}

main()