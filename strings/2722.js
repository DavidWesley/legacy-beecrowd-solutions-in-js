const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (let i = 0; i < +numCases; i++) {
		const l1 = lines[2 * i + 0]
		const l2 = lines[2 * i + 1]

		const limit = Math.max(l1.length, l2.length)

		let final = ""

		for (let u = 0; u < limit; u += 2)
			final += l1.substr(u, 2) + l2.substr(u, 2)

		responses.push(final)
	}

	console.log(responses.join("\n"))
}

main()