const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split(" ", 9)
	.map(value => Number.parseInt(value, 10))

const CHRISTMAS_REINDEER_NAMES = [
	"Dasher",
	"Dancer",
	"Prancer",
	"Vixen",
	"Comet",
	"Cupid",
	"Donner",
	"Blitzen",
	"Rudolph"
]

const reindeerName = CHRISTMAS_REINDEER_NAMES[input.reduce((sum, value) => sum + value, -1) % CHRISTMAS_REINDEER_NAMES.length]

console.log(reindeerName)
