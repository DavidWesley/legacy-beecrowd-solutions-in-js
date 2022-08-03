const { readFileSync } = require("fs")
const [sphereRadius, height, width, depth] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/, 4)
	.map(Number.parseFloat)

const isFits = sphereRadius <= Math.min(height, width, depth)

console.log(isFits ? "S" : "N")