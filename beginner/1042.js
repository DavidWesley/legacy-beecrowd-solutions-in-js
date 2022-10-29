const { readFileSync } = require("node:fs")
const [N1, N2, N3] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map(value => Number.parseInt(value, 10))

function main() {
	const three = [N1, N2, N3]
	const sortedThree = [...three].sort((a, b) => a - b)

	for (const N of [...sortedThree, "", ...three]) console.log(N)
}

main()
