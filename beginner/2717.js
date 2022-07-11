const { readFileSync } = require("fs")
const [N, A, B] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/, 3)
	.map(value => Number.parseInt(value, 10))

console.log(
	(A + B) <= N ? "Farei hoje!" : "Deixa para amanha!"
)