const { readFileSync } = require("node:fs")

const ages = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map(age => Number.parseInt(age, 10))

function main() {
	// min and max ages
	const limits = [Math.max.apply(null, ages), Math.min.apply(null, ages)]

	const correctName = ["huguinho", "zezinho", "luisinho"].at(ages.findIndex((age) => limits.includes(age) === false))
	console.log(correctName)
}

main()