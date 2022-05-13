const { readFileSync } = require("fs")

const [flutuationA, flutuationB] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(Number.parseFloat)
	.map(flutt => flutt * 1e-2)

const FLUTUATION_PRECISION = 6

const totalFlutuation = (1 + flutuationA) * (1 + flutuationB) - 1.00
const totalFlutuationInPercent = totalFlutuation * 100.00

console.log(totalFlutuationInPercent.toFixed(FLUTUATION_PRECISION))