const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const SquareList = Array.from({ length: 101 }, (_, i) => Math.pow(i, 2))

function isSumOfTwoSquares(num) {
	if (num < 0) return false
	if (num == 0) return true

	const boundary = Math.floor(Math.sqrt(num))

	for (let i = 0; i <= boundary; i++) {
		for (let j = 0; j <= boundary; j++) {
			const sum = SquareList[i] + SquareList[j]

			if (sum > num) break
			else if (sum == num) return true
		}
	}

	return false
}


function main() {
	const responses = []

	for (const line of input)
		if (line === "") break // EOFile Condition
		else responses.push(isSumOfTwoSquares(+line) ? "YES" : "NO")

	console.log(responses.join("\n"))
}

main()