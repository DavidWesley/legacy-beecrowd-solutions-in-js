const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function seqseq(from, to) {
	const result = []

	for (let i = from; i <= to; i++) result.push(...Array(Math.abs(i) || 1).fill(i))
	return result
}

function main() {
	const responses = []

	for (let index = 0; index < input.length; index++) {
		const lim = input[index]
		if (lim == "") break // EOFile

		const seq = seqseq(0, +lim)
		const size = seq.length

		responses.push(
			`Caso ${index + 1}: ${size} numero${size > 1 ? "s" : ""}`,
			`${seq.join(" ")}`,
			""
		)
	}

	console.log(responses.join("\n"))
}

main()