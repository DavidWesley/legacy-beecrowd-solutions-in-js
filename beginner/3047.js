const { readFileSync } = require("fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 3)
	.map(age => Number.parseInt(age, 10))

const [higherAge] = [B, C, A - (B + C)].sort((ageA, ageB) => ageB - ageA)

console.log(higherAge)