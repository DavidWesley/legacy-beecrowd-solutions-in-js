const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function BrazilVSGermanyBoardFromTime(time = 90) {
	const Brazil = Math.floor((time / 90) * 1)
	const Germany = Math.ceil((time / 90) * 7)

	return [Brazil, Germany]
}

function main() {
	const responses = []

	for (const time of input) {
		if (time == "0") break

		const [BRGols, DEGols] = BrazilVSGermanyBoardFromTime(Number.parseInt(time, 10))
		responses.push(`Brasil ${BRGols} x Alemanha ${DEGols}`)
	}

	console.log(responses.join("\n"))
}

main()