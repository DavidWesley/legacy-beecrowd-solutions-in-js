const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 3).map((value) => Number.parseInt(value, 10)))

/**
 * @param {number} Q Quantidade de degraus presentes na escada
 * @param {number} H Altura H do degrau
 * @param {number} W Profundidade W do degrau
 * @param {number} L Comprimento L do degrau
 */
const calcRampArea = (Q, H, W, L) => Math.hypot(H, W) * Q * L

function main() {
	const output = []

	for (let index = 0; index < input.length; index += 2) {
		const [N] = input[index + 0]

		if (isNaN(N)) break // EOF

		const [H, C, L] = input[index + 1] // dimensions in cm
		const area = calcRampArea(N, H, C, L) * 1e-4 // cm² -> m²

		output.push(area.toFixed(4))
	}

	console.log(output.join("\n"))
}

main()
