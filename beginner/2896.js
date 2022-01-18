const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map(value => Number.parseInt(value, 10)))


function main() {
	const responses = []

	for (let i = 0; i < numLines; i++) {
		const [purchasedNum, emptiesNum] = lines[i]
		const bottlesLeftsOnHands = Math.trunc(purchasedNum / emptiesNum) + (purchasedNum) % (emptiesNum)

		responses.push(bottlesLeftsOnHands)
	}

	console.log(responses.join("\n"))
}

main()