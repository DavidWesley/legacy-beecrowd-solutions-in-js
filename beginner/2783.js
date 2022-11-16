const { readFileSync } = require("node:fs")
const [
	[N, C, M],
	stampedStickers,
	stickers
] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 3)
	.map((line) => line.split(" ").map((value) => Number.parseInt(value, 10)))


console.log(C - stampedStickers.filter((sticker) => stickers.includes(sticker)).length)
