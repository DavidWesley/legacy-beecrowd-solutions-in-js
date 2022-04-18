const { readFileSync } = require("fs")
const distance = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.shift()

const ponctuation = (distance = 0) => {
	if (distance <= 800) return 1
	else if (800 < distance && distance <= 1400) return 2
	else if (1400 < distance && distance <= 2000) return 3
	else return 0
}

console.log(ponctuation(Number.parseInt(distance, 10)))
