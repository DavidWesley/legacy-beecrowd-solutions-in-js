const { readFileSync } = require("fs")

const quantitiesPerNames = readFileSync("/dev/stdin", "utf8")
	.split("\n", 5)
	.map(line => Number.parseInt(line, 10))

const portions = new Map([
	["Curupira", 300],
	["Boitatá", 1500],
	["Boto", 600],
	["Mapinguari", 1000],
	["Iara", 150],
]) // massa em gramas

function main() {
	const DEFAULT_MASS = 225
	const portionsMassIndexes = Array.from(portions.values())
	const totalMass = quantitiesPerNames.reduce((sum, quantity, index) => sum + quantity * portionsMassIndexes[index], DEFAULT_MASS)

	console.log(totalMass)
}

main()