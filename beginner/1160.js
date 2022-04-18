const { readFileSync } = require("fs")
const [[numCases], ...cases] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ").map(Number.parseFloat))

for (let index = 0; index < numCases; index++) {
	const [pA, pB, tA, tB] = cases[index]
	if (isNaN(pA)) break

	let years = Math.log(pA / pB) / Math.log((1 + tB / 100) / (1 + tA / 100))

	if (years > 100) {
		console.log("Mais de 1 seculo.")
		continue
	} else
		years = 0

	let popA = pA
	let popB = pB

	while (popA <= popB) {
		popA = Math.floor(popA * (1 + tA / 100))
		popB = Math.floor(popB * (1 + tB / 100))
		if (++years > 100) break
	}

	console.log(years > 100 ? "Mais de 1 seculo." : `${years} years.`)
}