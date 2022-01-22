const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

function main() {
	const responses = []

	for (let i = 0; i < +numCases; i++) {
		const N = Number.parseInt(lines[3 * i][0], 10)
		const names = lines[3 * i + 1]
		const frequencies = lines[3 * i + 2]

		const unapts = []

		for (let j = 0; j < N; j++) {
			const name = names[j]
			const freq = frequencies[j].replace(/M/g, "")

			const on = (freq.match(/P/g) || []).length
			const out = (freq.match(/A/g) || []).length

			if (on / (out + on) < 0.75) unapts.push(name)
		}

		responses.push(unapts.join(" "))
	}

	console.log(responses.join("\n"))
}

main()