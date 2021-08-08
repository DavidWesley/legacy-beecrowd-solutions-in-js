const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const [firstLimit, secondLimit] = input.slice(0, 2).map((num) => parseInt(num))

function sortOrder([...nums] = [0], ascending = true) {
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
	const [minLimit, maxLimit] = sortOrder([firstLimit, secondLimit])
	const responses = returnNumFromRestValues(minLimit, maxLimit, 5, [3, 2])

	console.log(responses.join('\n'))
}

main()