const { readFileSync } = require("fs")
const [card1, card2] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(value => Number.parseInt(value, 10))

const thirdCard = 0.5 * (card1 + card2 + Math.abs(card1 - card2))
console.log(thirdCard)