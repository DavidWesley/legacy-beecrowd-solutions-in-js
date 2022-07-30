const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" ", 2))


function main() {
	const { G: expenses, V: resource } = lines
		.slice(0, Number.parseInt(numLines, 10))
		.map(([label, value]) => [label, Number.parseInt(value, 10)])
		.reduce((pair, [label, value]) => (pair[label] += value, pair), { G: 0, V: 0 })

	console.log(resource < expenses ? "NAO VAI TER CORTE, VAI TER LUTA!" : "A greve vai parar.")
}

main()