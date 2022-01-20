const { readFileSync } = require("fs")
const [size, ...lines] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/)
	.map((value) => Number.parseInt(value, 10))

const DIVISORS = [2, 3, 4, 5]

function main() {
	const output = []

	const nums = lines.slice(0, size)

	for (const div of DIVISORS)
		output.push(`${nums.filter((n) => n % div == 0).length} Multiplo(s) de ${div}`)

	console.log(output.join("\n"))
}

main()