const { readFileSync } = require("node:fs")

const [B, H] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(Number.parseFloat)


console.log(
	"Concluimos que, dado o limite da entrada, a resposta seria:  y = f(x) = %s.", ((B * H) / 2).toFixed(5)
)