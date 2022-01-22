const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.slice(0, -1) // Exclude EOF

function main() {
	const lastChildName = input
		.sort((nameA, nameB) => nameA.localeCompare(nameB, undefined, { sensitivity: "accent" }))
		.pop()

	console.log(lastChildName)
}

main()