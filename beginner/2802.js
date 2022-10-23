const { readFileSync } = require("node:fs")
const [input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

/**
 * Short formule to count number of regions in a circle
 * Explain to solution
 * @link http://blogimages.bloggen.be/gnomon/attach/218796.pdf
 */
const R = (n = 0) => 1 + (n * (n - 1) * (12 + (n - 2) * (n - 3))) / 24

console.log(R(input))
