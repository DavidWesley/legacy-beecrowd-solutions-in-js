const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

const DISTANCE_TO_COST = 12.0

function willCatchIt(D, VF, VG) {
	const H = Math.hypot(DISTANCE_TO_COST, D)
	const TF = DISTANCE_TO_COST / VF
	const TG = H / VG

	return TF >= TG
}

function main() {
	const responses = []

	for (const line of input) {
		if (line.includes("")) break
		const [D, VF, VG] = line.map(Number.parseFloat)
		const isCatched = willCatchIt(D, VF, VG) ? "S" : "N"

		responses.push(isCatched)
	}

	console.log(responses.join("\n"))
}

main()