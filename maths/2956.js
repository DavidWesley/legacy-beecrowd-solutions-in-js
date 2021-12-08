const { readFileSync } = require("fs")

const [base, height] = readFileSync("/dev/stdin", "utf8")
	.split(' ')
	.slice(0, 2)
	.map(Number.parseFloat)

const triangleArea = (B, H) => (B * H) / 2

function main() {
	const area = triangleArea(+base, +height)

	console.log(
		`Concluimos que, dado o limite da entrada, a resposta seria:  y = f(x) = ${area.toFixed(5)}.`
	)
}

main()