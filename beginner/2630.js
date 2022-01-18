const { readFileSync } = require("fs")
const [numCases, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const RGB = {
	eye: (R = 0, G = 0, B = 0) => 0.3 * R + 0.59 * G + 0.11 * B,
	mean: (R = 0, G = 0, B = 0) => (R + G + B) / 3,
	max: (R = 0, G = 0, B = 0) => Math.max(R, G, B),
	min: (R = 0, G = 0, B = 0) => Math.min(R, G, B)
}

/** @param {keyof RGB} funcName */

const grey = (funcName) => (R = 0, G = 0, B = 0) => Math.trunc(RGB[funcName](R, G, B))

function main() {
	const responses = []

	for (let numCaseIndex = 0; numCaseIndex < +numCases; numCaseIndex++) {
		const method = lines[2 * numCaseIndex]
		const [R, G, B] = lines[2 * numCaseIndex + 1].split(" ").map((p) => Number.parseInt(p, 10))

		const level = grey(method)(R, G, B)
		responses.push(`Caso #${numCaseIndex + 1}: ${level}`)
	}

	console.log(responses.join("\n"))
}

main()