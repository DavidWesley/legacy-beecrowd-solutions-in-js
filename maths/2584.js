const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const toRad = (degree) => Number.parseFloat(degree) * (Math.PI / 180.0)

function pentagonRegularArea(side) {
	const A1 = Math.pow(side, 2) * Math.sin(toRad(36)) * (1 - Math.cos(toRad(108)))
	const A2 = Math.pow(side, 2) * Math.sin(toRad(108))

	return A2 + A1
}

function main() {
	const responses = lines.slice(0, +numLines).map((line) => pentagonRegularArea(line).toFixed(3))
	console.log(responses.join("\n"))
}

main()