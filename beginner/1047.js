const { readFileSync } = require("fs")
const [H1, M1, H2, M2] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 4)
	.map((time) => Number.parseInt(time, 10))

function main() {
	const h = ((24 + H2 - H1) % 24) * 60
	const m = M2 - M1
	const resolvedTimeInMinutes = (1440 + (h + m)) % 1440 || 1440

	const hours = Math.floor(resolvedTimeInMinutes / 60)
	const minutes = resolvedTimeInMinutes % 60

	console.log("O JOGO DUROU %d HORA(S) E %d MINUTO(S)", hours, minutes)
}

main()
