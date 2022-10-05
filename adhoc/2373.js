const { readFileSync } = require("fs")
const [[numLines], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ", 2).map(value => Number.parseInt(value, 10)))


function main() {
	let brokenGlassesQuantity = 0
	for (let index = 0; index < numLines; index += 1) {
		const [L, C] = input[index]
		if (L > C) brokenGlassesQuantity += C
	}

	console.log(brokenGlassesQuantity)
}

main()
