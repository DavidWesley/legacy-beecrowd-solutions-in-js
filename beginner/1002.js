const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")

const PI = +Math.PI.toFixed(5)
const [radius] = input.split("\n").map(r => +Number.parseFloat(r).toFixed(2))

function circleArea(r) {
	const area = PI * Math.pow(r, 2)
	return area.toFixed(4)
}

function main() {
	const areaCircle = circleArea(radius)
	console.log(`A=${areaCircle}`)
}

main()