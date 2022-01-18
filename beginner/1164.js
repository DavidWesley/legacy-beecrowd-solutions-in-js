const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function isPerfectNumber(num) {
	let divisorsSum = 0
	const boundary = Math.floor(num / 2)
	for (let div = 1; div <= boundary; div++) if (num % div == 0) divisorsSum += div

	return divisorsSum == num
}

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map((num) => `${num} ${isPerfectNumber(+num) ? "eh" : "nao eh"} perfeito`)

	console.log(responses.join("\n"))
}

main()