const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const MAX_FRACTION_PART_LENGTH = 10

const MyNumberFormatter = new Intl.NumberFormat("en-US", {
	minimumIntegerDigits: 1,
	minimumFractionDigits: 1,
	style: "decimal",
	notation: "standard",
	signDisplay: "never",
	maximumFractionDigits: MAX_FRACTION_PART_LENGTH,
	useGrouping: false
})

function round(num = "0", cutoff = "0.5") {
	const parts = {
		num: MyNumberFormatter.formatToParts(num),
		cutoff: MyNumberFormatter.formatToParts(cutoff)
	}

	const intNum = Number.parseInt(
		parts.num.find(({ type }) => type == "integer").value,
		10
	)

	const fracNum = Number.parseFloat(
		`0.${parts.num.find(({ type }) => type === "fraction").value}`
	)

	const fracCutoff = Number.parseFloat(
		`0.${parts.cutoff.find(({ type }) => type === "fraction").value}`
	)

	return fracNum >= fracCutoff ? intNum + 1 : intNum
}

function main() {
	const responses = []

	for (let i = 0; i < input.length; i += 2) {
		const num = input[i]
		const cutoff = input[i + 1]

		if (!num || !cutoff) break // EOF
		else responses.push(round(num, cutoff))
	}

	console.log(responses.join("\n"))
}

main()