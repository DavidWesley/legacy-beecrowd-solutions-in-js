const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ").map(value => Number.parseInt(value, 10)))


function main() {
	const distance = lines
		.slice(0, numLines)
		.reduce((total, [time, velocity]) => total + (time * velocity), 0)

	console.log(distance)
}

main()