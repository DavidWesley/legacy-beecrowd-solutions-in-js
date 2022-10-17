const { readFileSync } = require("node:fs")
const [P, J1, J2, R, A] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 5)
	.map(value => Number.parseInt(value, 10))


if (R === 1 && A === 1)
	console.log("Jogador 2 ganha!")
else
	console.log(
		(J1 + J2) % 2 === (1 - P) || R === 1
			? "Jogador 1 ganha!"
			: "Jogador 2 ganha!"
	)
