const Float = (num = 0, precision) => Number.parseFloat(num.toFixed(precision))

const { readFileSync } = require("node:fs")
const [input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number.parseFloat)
	.map(radius => Float(radius, 2))

const calculateCircleAreaFromRadius = (radius = 0, pi = Math.PI) => pi * Math.pow(radius, 2)

function main() {
	const PI = Float(Math.PI, 5)
	const area = calculateCircleAreaFromRadius(input, PI)
	console.log("A=%s", area.toFixed(4))
}

main()
