const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(Number.parseFloat)

/** @param {number} R */
function calcAreas(R = 0) {
	// P = πR²/12 - R²sin(30)/2 = R²(π - 3)/12
	const P = Math.pow(R, 2) * (Math.PI - 3) / 12
	// l² = 2R² - 2R²cos(30) = R²(2 - √3)
	const l2 = Math.pow(R, 2) * (2 - Math.sqrt(3))
	// primeiro número irá indicar a área da região listrada (central),
	const S1 = l2 + 4 * P
	// segundo número irá indicar a área total das regiões com pontos
	const S2 = 4 * (l2 * Math.sqrt(3) / 4 + P)
	// terceiro número irá indicar a área da região quadriculada (mais externa).
	const S3 = 4 * (l2 / 4 - 2 * P)

	return [S1, S2, S3]
}

//// MAIN ////
function main() {
	const output = []

	for (const L of input) {
		if (Number.isNaN(L)) break // EOF
		else output.push(calcAreas(L).map(a => a.toFixed(3)).join(" "))
	}

	console.log(output.join("\n"))
}

main()
