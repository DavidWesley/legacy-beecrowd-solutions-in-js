const { readFileSync } = require("fs")
const numbers = readFileSync("/dev/stdin", "utf8").split(' ').map(Number.parseFloat)

const biggerNumber = (nums) => Reflect.apply(Math.max, null, nums)

function main() {
	const bigger = biggerNumber(numbers)
	console.log("%d eh o maior", bigger)
}

main()