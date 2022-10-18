const { readFileSync } = require("node:fs")
const [[numStars], stars] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(line => line.split(" ", 1e6).map(value => Number.parseInt(value, 10)))

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1

function main() {
	const stolenStarsPlaces = new Set()

	for (let index = 0; index >= 0 && index < numStars;) {
		const pIndex = index
		if (stolenStarsPlaces.has(pIndex) === false)
			stolenStarsPlaces.add(pIndex)
		index += isOdd(stars[pIndex]) ? 1 : -1
		if (stars[pIndex] > 0) stars[pIndex] -= 1
	}

	const dontStolenStarsQuantity = stars.reduce((sum, value) => sum + value, 0)
	console.log("%d %d", stolenStarsPlaces.size, dontStolenStarsQuantity)
}

main()
