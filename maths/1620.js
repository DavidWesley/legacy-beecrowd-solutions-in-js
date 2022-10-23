const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.replace(/e(\d+)$/i, (_, g1) => "0".repeat(+g1)))
	.map(BigInt)

function main() {
	const output = []
	const MIN_PRECISION_SCALE = 1e9

	for (const L of input) {
		if (L === 0n) break
		const I = L + L - 3n
		const result = Number((I - L) * BigInt(MIN_PRECISION_SCALE) / L)

		output.push((result / MIN_PRECISION_SCALE).toFixed(6))
	}

	console.log(output.join("\n"))
}

main()
