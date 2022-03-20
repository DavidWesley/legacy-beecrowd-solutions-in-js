const { readFileSync } = require("fs")
const [N, M, ...map] = readFileSync("/dev/stdin", "utf8").split(/\s/g)

const NamedChars = {
	SOIL: "#",	// # para representar a terra.
	WATER: ".",	// . para representar a água ou
	COAST: "~",	// ~ para representar a costa
}

function main() {
	const counter = { coasts: 0 }
	const graph = Array.from(map, (line) => [...line])

	for (let i = 0; i < + N; i++) {
		for (let j = 0; j < +M; j++) {
			if (graph[i][j] === NamedChars.SOIL) {
				if (
					graph[i][Math.max(j - 1, 0)] === NamedChars.WATER || // HORIZONTAL
					graph[i][Math.min(+N - 1, j + 1)] === NamedChars.WATER || // HORIZONTAL
					graph[Math.max(i - 1, 0)][j] === NamedChars.WATER || // VERTICAL
					graph[Math.min(+M - 1, i + 1)][j] === NamedChars.WATER || // VERTICAL
					i == 0 || // BORDA
					j == 0 || // BORDA
					i == +N - 1 || // BORDA
					j == +M - 1 // BORDA
				) {
					counter.coasts += 1
				}
			}
		}
	}

	console.log(counter.coasts)
}

main()