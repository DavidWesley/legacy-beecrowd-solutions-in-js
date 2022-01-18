const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = new Array()

	for (let index = 0; index < lines.length; index += 2) {
		if (lines[index] == "") break

		const [L, C] = lines[index].split(" ").slice(1, 3).map(Number.parseFloat)
		const text = lines[index + 1]

		const regex = RegExp(`\\b\\w[\\w ]{0,${C - 1}}\\b`, "gis")
		const numPages = Math.ceil(text.match(regex).length / L)

		responses.push(numPages)
	}

	console.log(`${responses.join("\n")}`)
}

main()