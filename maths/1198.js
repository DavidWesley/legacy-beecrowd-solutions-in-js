const { readFileSync } = require("fs")
const input = readFileSync('/dev/stdin', "utf8").split('\n')

const soldiersPairs = input.map(line => line.split(" ").map(value => value === "" ? "" : BigInt(value)))

function bigintAbsDiff(...nums) {
	const diff = nums.reduceRight((diff, value) => value - diff, 0n)
	const abs = diff < 0n ? -diff : diff

	return abs
}

function main() {
	const responses = []

	for (const [H, O] of soldiersPairs) {
		if (H === '' || O === '') break // EOFile Condition Verification
		const diff = bigintAbsDiff(H, O).toString()

		responses.push(diff)
	}

	console.log(`${responses.join("\n")}`)
}

main()