const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((num) => Number.parseInt(num, 10)))

function main() {
	const responses = Array(numLines)
		.fill(0)
		.map((_, index) => {
			const [avenueSize, radarRange] = lines[index]
			return Math.ceil(avenueSize / radarRange)
		})

	console.log(responses.join("\n"))
}

main()