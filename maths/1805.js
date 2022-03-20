const { readFileSync } = require("fs")
const [min, max] = readFileSync("/dev/stdin", "utf8").split(" ")

function PA(min, max = min, step = 1) {
	return 0.5 * ((max + min) * ((max - min) / step + 1))
}

console.log(PA(+min, +max))