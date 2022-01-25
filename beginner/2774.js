const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map(Number.parseFloat))


const Averages = {
	arithmetic: ([...values]) => values.reduce((sum, value) => sum + value, 0) / values.length
}

const Deviations = {
	standard([...values]) {
		const avg = Averages.arithmetic(values)
		const len = values.length - 1

		return Math.sqrt(
			values.reduce((sum, value) => sum + Math.pow(value - avg, 2), 0) / len
		)
	}
}


function main() {
	const responses = []

	for (let i = 0; i < lines.length; i += 2) {
		const [H, M] = lines[i + 0]

		if (isNaN(H) || isNaN(M)) break // EOF

		const size = Math.floor(H * 60 / M)
		const measurements = lines[i + 1].slice(0, size)
		const standardDeviation = Deviations.standard(measurements)

		responses.push(standardDeviation.toFixed(5))
	}

	console.log(responses.join("\n"))
}

main()