const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").shift()

function main() {
	const N = Number.parseInt(input, 10)

	const Y = Math.floor(N / 365)
	const M = Math.floor((N % 365) / 30)
	const D = (N % 365) % 30

	console.log("%d ano(s)\n%d mes(es)\n%d dia(s)", Y, M, D)
}

main()