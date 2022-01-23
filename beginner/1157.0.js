const { readFileSync } = require("fs")
const [num] = readFileSync("/dev/stdin", "utf8").split("\n")

const isNegative = (num) => Math.sign(num) === -1
const toNegative = (num) => Math.abs(Number(num)) * -1

const getDivisorsFromNumber = (/**@type {number}*/ num) => {
	const divisorsList = [1]

	for (let currDiv = 2; currDiv <= Math.abs(num); currDiv++)
		if (num % currDiv === 0) divisorsList.push(currDiv)

	if (isNegative(num))
		return divisorsList.map(toNegative).reverse().concat(divisorsList)
	else return divisorsList
}

function main() {
	const divisors = getDivisorsFromNumber(+num)

	console.log(divisors.join("\n"))
}

main()