const { readFileSync } = require("fs")

const [firstLimit, secondLimit] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map((num) => Number.parseInt(num, 10))

function sorter([...nums] = [0], ascending = true) {
	return ascending ? nums.sort((a, b) => a - b) : nums.sort((a, b) => b - a)
}

function returnNumFromRestValues(min, max = min, mod = 1, restsNums = []) {
	const nums = []

	for (let i = min + 1; i < max; i++)
		if (restsNums.includes(i % mod))
			nums.push(i)

	return nums
}

function main() {
	const [minLimit, maxLimit] = sorter([firstLimit, secondLimit])
	const responses = returnNumFromRestValues(minLimit, maxLimit, 5, [3, 2])

	console.log(responses.join("\n"))
}

main()